import { NextRequest, NextResponse } from "next/server";
import { generateProposal } from "@/lib/generate";
import type { ProposalInput, GenerateResponse } from "@/lib/types";

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: ProposalInput = await req.json();
    const { title, overview, budget, platform } = body;

    if (!title || !overview || !budget || !platform) {
      return NextResponse.json({ success: false, error: "必須項目が不足しています" }, { status: 400 });
    }

    const data = await generateProposal(body);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("Generate error:", e);
    return NextResponse.json({ success: false, error: "提案文の生成に失敗しました" }, { status: 500 });
  }
}
