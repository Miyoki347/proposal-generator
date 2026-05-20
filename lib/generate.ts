import { generateWithClaude } from "./claude";
import { generateWithGemini } from "./gemini";
import { buildPrompt } from "./prompts";
import type { ProposalInput, ProposalOutput } from "./types";

async function generate(prompt: string): Promise<{ text: string; model: string }> {
  try {
    const text = await generateWithClaude(prompt);
    return { text, model: "claude-haiku-4-5" };
  } catch (e) {
    console.warn("Claude failed, falling back to Gemini:", e);
    const text = await generateWithGemini(prompt);
    return { text, model: "gemini-2.0-flash (fallback)" };
  }
}

export async function generateProposal(input: ProposalInput): Promise<ProposalOutput> {
  const result = await generate(buildPrompt(input, input.platform));
  return { text: result.text, model: result.model };
}
