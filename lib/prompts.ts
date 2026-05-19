import type { Platform, ProposalInput } from "./types";

const PLATFORM_NOTES: Record<Exclude<Platform, "both">, string> = {
  crowdworks: `
- CrowdWorksの慣習に合わせて書く
- 冒頭に「はじめまして」などの挨拶を入れる
- 実績・スキルを具体的に示す
- 納期・対応速度をアピールする
- 字数の目安：400〜600字`,

  lancers: `
- ランサーズの慣習に合わせて書く
- 提案の理由・共感を冒頭に入れる
- 過去の類似実績を具体的に示す
- 丁寧かつ簡潔なビジネス文体で書く
- 字数の目安：400〜600字`,
};

export function buildPrompt(input: ProposalInput, platform: Exclude<Platform, "both">): string {
  const { title, overview, budget } = input;
  const notes = PLATFORM_NOTES[platform];

  return `あなたはフリーランスの提案文作成の専門家です。
以下の案件情報をもとに、${platform === "crowdworks" ? "CrowdWorks" : "ランサーズ"}向けの提案文を1つ作成してください。

【案件情報】
- タイトル：${title}
- 概要：${overview}
- 予算：${budget}

【作成ルール】${notes}

提案文のみを出力してください。前置きや説明文は不要です。`;
}
