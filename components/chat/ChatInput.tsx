'use client';

import { useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  autoFocus?: boolean;
};

export default function ChatInput({ value, onChange, onSend, disabled, autoFocus }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      // Small delay to let the panel animation settle
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && value.trim() && !disabled) {
      e.preventDefault();
      onSend();
    }
  }

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      className="flex items-center gap-2 border-t border-line bg-surface px-3 pt-3 pb-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) onSend();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={500}
        disabled={disabled}
        placeholder="Ask about a project, a skill, or how I work…"
        aria-label="Type your question"
        className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-[9px] text-[14px] text-text placeholder:text-text-3 transition-colors duration-150 hover:border-line-strong focus:border-coral disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-150',
          canSend
            ? 'cursor-pointer bg-coral text-white hover:scale-105 motion-reduce:hover:scale-100'
            : 'cursor-not-allowed bg-surface-2 text-text-3',
        )}
      >
        <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </form>
  );
}
