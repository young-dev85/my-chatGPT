import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    data: { model },
  } = await req.json();

  const result = await streamText({
    model: openai(model || "gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}