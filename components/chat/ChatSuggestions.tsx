'use client';

const SUGGESTIONS = [
  "What's live in production?",
  'How do you work with AI agents?',
  'Tell me about replacing your own legacy system',
  "What's your tech stack?",
];

type ChatSuggestionsProps = {
  onSelect: (question: string) => void;
};

/**
 * Opening prompts, styled as the gallery's filter pills so they read as the
 * same kind of control everywhere on the site.
 */
export default function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Suggested questions">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onSelect(q)}
          className="cursor-pointer rounded-full border border-line bg-surface px-[14px] py-[7px] text-left font-mono text-[12.5px] text-text-2 transition-colors duration-150 hover:border-coral hover:text-coral"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
