'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { useMotionEnabled } from '@/lib/use-motion';
import { cn } from '@/lib/utils';

export type ChatRole = 'user' | 'assistant';

type ChatMessageProps = {
  role: ChatRole;
  content: string;
  isStreaming?: boolean;
  /** Set on assistant turns that are error notices rather than answers. */
  isError?: boolean;
  onNavigate?: (href: string) => void;
  /** Offered on error turns so a failed question can be resent in place. */
  onRetry?: () => void;
};

/** Small monogram that marks assistant turns — the same badge as the header. */
export function AssistantBadge({ size = 'small' }: { size?: 'small' | 'default' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-[var(--radius-xs)] bg-coral-bg font-display font-bold text-coral',
        size === 'small' ? 'size-6 text-[11px]' : 'size-9 rounded-[var(--radius-sm)] text-[15px]',
      )}
    >
      R
    </span>
  );
}

function TypingIndicator() {
  const motionEnabled = useMotionEnabled();
  return (
    <div className="flex items-center gap-[5px] px-1 py-[7px]" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block size-[6px] rounded-full bg-text-3"
          animate={motionEnabled ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.6 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const ALLOWED_ELEMENTS = new Set(['p', 'strong', 'em', 'ul', 'ol', 'li', 'a']);

function createMarkdownComponents(onNavigate?: (href: string) => void): Components {
  const linkClass =
    'cursor-pointer font-medium text-coral underline decoration-coral/40 underline-offset-[3px] hover:decoration-coral';
  return {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>,
    ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    a: ({ href, children }) => {
      const isInternal = href?.startsWith('/');
      if (isInternal && onNavigate) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(href!);
            }}
            className={linkClass}
          >
            {children}
          </a>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {children}
        </a>
      );
    },
  };
}

/**
 * One turn of the conversation. User turns sit right in coral tint; assistant
 * turns sit left on a surface card behind the monogram badge, so the two voices
 * never blur together even when an answer runs long.
 */
export default function ChatMessage({
  role,
  content,
  isStreaming,
  isError,
  onNavigate,
  onRetry,
}: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-[var(--radius-md)] rounded-br-[var(--radius-xs)] bg-coral-bg px-[14px] py-[9px] text-[14px] leading-[1.55] text-text">
          <p className="m-0 whitespace-pre-wrap break-words">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      {/* Aligned to the first line, not the bubble's foot — a long answer would
          otherwise leave the badge stranded at the bottom. */}
      <span className="mt-[3px] flex">
        <AssistantBadge />
      </span>
      {isError ? (
        <div
          role="alert"
          className="flex max-w-[86%] flex-col gap-2 rounded-[var(--radius-md)] rounded-bl-[var(--radius-xs)] border border-amber/40 bg-amber-bg px-[14px] py-[10px] text-[13.5px] leading-[1.5] text-text"
        >
          <span className="flex items-start gap-2">
            <AlertTriangle size={15} className="mt-[3px] shrink-0 text-amber" aria-hidden="true" />
            <span className="break-words">{content}</span>
          </span>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex w-fit cursor-pointer items-center gap-[6px] rounded-full border border-line bg-surface px-[11px] py-[4px] font-mono text-[11.5px] text-text-2 transition-colors duration-150 hover:border-coral hover:text-coral"
            >
              <RotateCcw size={12} aria-hidden="true" />
              Try again
            </button>
          )}
        </div>
      ) : (
        <div className="max-w-[86%] rounded-[var(--radius-md)] rounded-bl-[var(--radius-xs)] border border-line bg-surface px-[14px] py-[9px] text-[14px] leading-[1.55] text-text-2">
          {isStreaming && !content ? (
            <TypingIndicator />
          ) : (
            <div className="break-words">
              <ReactMarkdown
                allowedElements={[...ALLOWED_ELEMENTS]}
                unwrapDisallowed
                components={createMarkdownComponents(onNavigate)}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
