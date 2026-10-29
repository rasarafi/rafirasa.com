type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ValidationResult = {
  valid: boolean;
  error?: string;
  sanitizedMessages?: ChatMessage[];
};

const MAX_USER_CHARS = 500;
// Replies are prompted to stay under 250 words; this leaves room for markdown
// while stopping forged, oversized assistant turns.
const MAX_ASSISTANT_CHARS = 4000;
const MAX_TOTAL_CHARS = 20_000;

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

export function validateChatRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { messages } = body as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return { valid: false, error: 'Messages array is required.' };
  }

  if (messages.length > 15) {
    return { valid: false, error: 'Conversation limit reached (15 messages max).' };
  }

  const sanitized: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: `Message ${i + 1} is invalid.` };
    }

    const { role, content } = msg as { role?: unknown; content?: unknown };

    if (role !== 'user' && role !== 'assistant') {
      return { valid: false, error: `Message ${i + 1} has invalid role.` };
    }

    if (typeof content !== 'string') {
      return { valid: false, error: `Message ${i + 1} content must be a string.` };
    }

    const cleaned = stripHtml(content).trim();

    if (role === 'assistant' && cleaned.length > MAX_ASSISTANT_CHARS) {
      return { valid: false, error: `Message ${i + 1} is too long.` };
    }

    if (role === 'user') {
      if (cleaned.length < 2) {
        return { valid: false, error: 'Message is too short (minimum 2 characters).' };
      }

      if (cleaned.length > MAX_USER_CHARS) {
        return { valid: false, error: 'Message is too long (maximum 500 characters).' };
      }
    }

    sanitized.push({ role, content: cleaned });
  }

  const totalChars = sanitized.reduce((n, m) => n + m.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    return { valid: false, error: 'Conversation is too long.' };
  }

  // Last message must be from user
  if (sanitized[sanitized.length - 1].role !== 'user') {
    return { valid: false, error: 'Last message must be from user.' };
  }

  return { valid: true, sanitizedMessages: sanitized };
}
