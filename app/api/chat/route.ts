import { google } from '@ai-sdk/google';
import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-pro'),
    messages: convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log('Stream was aborted');
        // Handle abort-specific cleanup here
        // e.g., persist partial results, log abort event, etc.
      } else {
        console.log('Stream completed normally');
        // Handle normal completion here
        // e.g., save final results, log completion, etc.
      }
    },
    consumeSseStream: consumeStream,
  });
}