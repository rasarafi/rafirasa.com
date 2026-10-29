import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '@/lib/chat-prompt';
import { getClientIP, checkRateLimit } from '@/lib/rate-limit';
import { validateChatRequest } from '@/lib/validate-chat';
import { checkSuspiciousInput } from '@/lib/chat-monitor';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const ip = getClientIP(request);

  // Rate limit
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  // Validate
  const validation = validateChatRequest(body);
  if (!validation.valid) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const messages = validation.sanitizedMessages!;

  // Monitor for suspicious patterns
  const lastMessage = messages[messages.length - 1];
  checkSuspiciousInput(lastMessage.content, ip);

  // Forward to OpenAI
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: unknown) {
    if (error instanceof OpenAI.APIError) {
      console.error(`[CHAT-API] OpenAI ${error.status} ${error.type ?? ''}`);
      if (error.status === 429) {
        return Response.json(
          { error: 'The AI service is temporarily busy. Please try again in a moment.' },
          { status: 503 }
        );
      }
    } else {
      console.error('[CHAT-API] Error:', error);
    }

    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
