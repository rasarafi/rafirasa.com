'use client';

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ChatMessage, { AssistantBadge, type ChatRole } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatSuggestions from './ChatSuggestions';
import { useMotionEnabled } from '@/lib/use-motion';
import { cn } from '@/lib/utils';

type Message = {
  role: ChatRole;
  content: string;
  /** An assistant turn that reports a failure rather than answering. */
  error?: boolean;
};

const MAX_MESSAGES = 15;

/** Below Tailwind's `sm` breakpoint the drawer is a bottom sheet. */
const SHEET_QUERY = '(max-width: 639px)';

function subscribeSheet(cb: () => void) {
  const mq = window.matchMedia(SHEET_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function useIsSheet(): boolean {
  return useSyncExternalStore(
    subscribeSheet,
    () => window.matchMedia(SHEET_QUERY).matches,
    () => false,
  );
}

const ERROR_MESSAGES: Record<string, string> = {
  '429': "I've reached my limit for now. Feel free to email Rasa directly for more questions.",
  '400': "I couldn't process that message. Try rephrasing?",
  network: "It looks like there's a connection issue. Please check your internet and try again.",
  default: 'Something went wrong on my end. Please try again in a moment.',
};

function getErrorMessage(status?: number): string {
  if (!status) return ERROR_MESSAGES.network;
  if (status === 429) return ERROR_MESSAGES['429'];
  if (status === 400) return ERROR_MESSAGES['400'];
  return ERROR_MESSAGES.default;
}

/** Replaces a pending (empty, streaming) assistant turn, or appends. */
function withError(prev: Message[], content: string): Message[] {
  const last = prev[prev.length - 1];
  const errorTurn: Message = { role: 'assistant', content, error: true };
  if (last?.role === 'assistant' && !last.content) {
    return [...prev.slice(0, -1), errorTurn];
  }
  return [...prev, errorTurn];
}

/**
 * The AI assistant, as a floating panel on desktop and a bottom sheet on
 * mobile. Built from the same Card, pill and monogram vocabulary as the rest
 * of the site — see the Biscuit Aurora spec — so it reads as part of the
 * portfolio rather than a bolted-on widget.
 */
export default function ChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const isSheet = useIsSheet();
  const router = useRouter();
  const chatEndpoint = '/api/chat/';

  const handleChatNavigate = useCallback(
    (href: string) => {
      setIsOpen(false);
      router.push(href);
    },
    [router],
  );

  const isLimitReached = messages.length >= MAX_MESSAGES;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'instant' });
  }, [messages, motionEnabled]);

  // Escape key closes drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Click outside closes drawer (desktop only)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isOpen) return;
      // Only on desktop (sm+)
      if (window.innerWidth < 640) return;
      const target = e.target as HTMLElement;
      // Don't close if clicking the trigger button
      if (target.closest('[data-chat-trigger]')) return;
      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  /**
   * Sends `history` (which must end with a user turn) and streams the reply.
   * Kept separate from `sendMessage` so a retry can resend the same history
   * without re-appending the user's question.
   */
  const request = useCallback(
    async (history: Message[]) => {
      setIsLoading(true);
      try {
        const response = await fetch(chatEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history
              .filter((m) => !m.error)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) {
          setMessages((prev) => withError(prev, getErrorMessage(response.status)));
          return;
        }

        // Add empty assistant message for streaming
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        const reader = response.body?.getReader();
        if (!reader) {
          setMessages((prev) => withError(prev, ERROR_MESSAGES.default));
          return;
        }

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            updated[updated.length - 1] = { ...last, content: last.content + chunk };
            return updated;
          });
        }
      } catch {
        setMessages((prev) => withError(prev, ERROR_MESSAGES.network));
      } finally {
        setIsLoading(false);
      }
    },
    [chatEndpoint],
  );

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isLoading) return;
      const history = [...messages, { role: 'user' as const, content: content.trim() }];
      setMessages(history);
      setInput('');
      void request(history);
    },
    [messages, isLoading, request],
  );

  /** Drops the trailing error turn and resends the question before it. */
  const retry = useCallback(() => {
    if (isLoading) return;
    const history = messages.filter((m) => !m.error);
    if (history[history.length - 1]?.role !== 'user') return;
    setMessages(history);
    void request(history);
  }, [messages, isLoading, request]);

  // Animation variants
  const panelCard = motionEnabled
    ? {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 12 },
      }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const panelSheet = motionEnabled
    ? {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '100%' },
      }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const iconVariants = motionEnabled
    ? {
        initial: { opacity: 0, scale: 0.8, rotate: -90 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.8, rotate: 90 },
      }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        data-chat-trigger
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        className={cn(
          'fixed z-50 flex cursor-pointer items-center justify-center rounded-full bg-coral text-white shadow-[var(--shadow-lift)] transition-transform duration-200 hover:-translate-y-[2px] hover:scale-105 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100',
          'right-5 bottom-6 sm:right-6 lg:right-10',
          'size-12 sm:size-[52px]',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              className="flex items-center justify-center"
              {...iconVariants}
              transition={{ duration: 0.15 }}
            >
              <X size={22} aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              className="flex items-center justify-center"
              {...iconVariants}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-text/30 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer Panel — a bottom sheet below `sm`, a floating card above it. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Chat assistant"
            className={cn(
              'fixed z-50 flex flex-col overflow-hidden border border-line bg-surface shadow-[var(--shadow-lift)]',
              'inset-x-0 bottom-0 h-[88dvh] rounded-t-[var(--radius-lg)] border-b-0',
              'sm:inset-x-auto sm:right-6 sm:bottom-[5.5rem] sm:h-[min(640px,calc(100dvh-7rem))] sm:w-[420px] sm:rounded-[var(--radius-lg)] sm:border-b lg:right-10',
            )}
            {...(isSheet ? panelSheet : panelCard)}
            transition={{ duration: isSheet ? 0.25 : 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Sheet handle — decorative; the sheet closes via the backdrop or the button. */}
            <span
              aria-hidden="true"
              className="mx-auto mt-2 block h-1 w-9 shrink-0 rounded-full bg-line-strong sm:hidden"
            />
            <DrawerContent
              messages={messages}
              input={input}
              isLoading={isLoading}
              isLimitReached={isLimitReached}
              messagesEndRef={messagesEndRef}
              onClose={() => setIsOpen(false)}
              onInputChange={setInput}
              onSend={() => sendMessage(input)}
              onSuggestion={sendMessage}
              onNavigate={handleChatNavigate}
              onRetry={retry}
              isOpen={isOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Inner content shared between mobile and desktop panels
function DrawerContent({
  messages,
  input,
  isLoading,
  isLimitReached,
  messagesEndRef,
  onClose,
  onInputChange,
  onSend,
  onSuggestion,
  onNavigate,
  onRetry,
  isOpen,
}: {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isLimitReached: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSuggestion: (question: string) => void;
  onNavigate: (href: string) => void;
  onRetry: () => void;
  isOpen: boolean;
}) {
  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <AssistantBadge size="default" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[15px] font-semibold tracking-[-0.2px] text-text">
            Ask about Rasa&apos;s work
          </p>
          <p className="truncate font-mono text-[11px] text-text-3">
            AI assistant · answers from the case studies
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat assistant"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Messages Area */}
      <div role="log" aria-live="polite" className="flex flex-1 flex-col overflow-y-auto bg-bg px-4 py-4">
        {isEmpty ? (
          <div className="my-auto flex flex-col items-center gap-4 py-4 text-center">
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[1.5px] text-coral">
              Start here
            </p>
            <h2 className="max-w-[22ch] font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.4px] text-text">
              What would you like to know?
            </h2>
            <p className="max-w-[34ch] text-[13.5px] leading-[1.55] text-text-2">
              I can walk you through the projects, the stack behind them, and how Rasa works
              with AI agents.
            </p>
            <ChatSuggestions onSelect={onSuggestion} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                isError={msg.error}
                isStreaming={isLoading && i === messages.length - 1 && msg.role === 'assistant'}
                onNavigate={msg.role === 'assistant' ? onNavigate : undefined}
                onRetry={msg.error && i === messages.length - 1 ? onRetry : undefined}
              />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input or Limit Message */}
      {isLimitReached ? (
        <div className="border-t border-line bg-surface px-4 py-3 text-center font-mono text-[12px] text-text-2">
          Conversation limit reached — email{' '}
          <a href="mailto:info@rafirasa.com" className="text-coral underline underline-offset-[3px]">
            info@rafirasa.com
          </a>{' '}
          for more.
        </div>
      ) : (
        <ChatInput
          value={input}
          onChange={onInputChange}
          onSend={onSend}
          disabled={isLoading}
          autoFocus={isOpen}
        />
      )}

      {/* Disclaimer */}
      <p className="bg-surface px-4 pb-2.5 text-center font-mono text-[10.5px] text-text-3">
        AI answers — verify anything important with Rasa directly.
      </p>
    </>
  );
}
