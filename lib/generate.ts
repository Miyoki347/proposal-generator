import { generateWithGemini } from "./gemini";
import { generateWithClaude } from "./claude";
import { buildPrompt } from "./prompts";
import type { ProposalInput, ProposalOutput } from "./types";

async function generate(prompt: string): Promise<{ text: string; model: string }> {
  try {
    const text = await generateWithGemini(prompt);
    return { text, model: "gemini-1.5-flash" };
  } catch (e) {
    console.warn("Gemini failed, falling back to Claude:", e);
    const text = await generateWithClaude(prompt);
    return { text, model: "claude-haiku (fallback)" };
  }
}

export async function generateProposal(input: ProposalInput): Promise<ProposalOutput> {
  const { platform } = input;

  if (platform === "both") {
    const [cw, lc] = await Promise.all([
      generate(buildPrompt(input, "crowdworks")),
      generate(buildPrompt(input, "lancers")),
    ]);
    return {
      crowdworks: cw.text,
      lancers: lc.text,
      model: cw.model,
    };
  }

  const result = await generate(buildPrompt(input, platform));
  return {
    ...(platform === "crowdworks" ? { crowdworks: result.text } : { lancers: result.text }),
    model: result.model,
  };
}
