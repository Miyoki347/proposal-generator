import type { Platform, ProposalInput, ProposalTone } from "./types";
import { JOB_TYPES, EXPERIENCE_YEARS } from "./presets";

const TONE_INSTRUCTION: Record<ProposalTone, string> = {
  polite: "丁寧で誠実な文体。謙虚さと信頼感を前面に出す。",
  business: "簡潔でプロフェッショナルなビジネス文体。要点を端的に伝える。",
  passionate: "熱意と積極性を感じさせる文体。案件への強い関心と意欲を示す。",
};

const PLATFORM_STRUCTURE: Record<Platform, string> = {
  crowdworks: `【CrowdWorks 提案文の構成ルール】
1. 冒頭は必ず「はじめまして、[名前]と申します。」から始める
2. 案件を読んで感じた課題認識・共感を1〜2文で述べる
3. 「なぜ私がこの案件に適しているか」を実績・スキルで具体的に示す（数字必須）
4. 登録ポートフォリオがある場合、最も関連するものを1件具体的に言及する（URLがあれば記載）
5. 対応姿勢・コミュニケーション方針を1文入れる（例：「ご連絡は原則24時間以内にお返しします」）
6. 「ご検討のほどよろしくお願いいたします」系の丁寧な締め
7. 文字数：400〜550字`,

  lancers: `【ランサーズ 提案文の構成ルール】
1. 冒頭は案件への共感・課題への理解から入る（「はじめまして」不要）
2. 「依頼者が本当に解決したいこと」を先読みして1〜2文で述べる
3. 実績・スキルで「なぜ私か」を具体的に示す（数字必須）
4. 登録ポートフォリオがある場合、最も関連するものを1件具体的に言及する（URLがあれば記載）
5. 差別化ポイント・強みを1文で端的に述べる
6. 「まずはお気軽にご相談ください」系の行動喚起で締める
7. 文字数：400〜550字`,
};

export function buildPrompt(input: ProposalInput, platform: Platform): string {
  const { title, overview, budget, tone, similarExperience, profile } = input;

  const jobTypeLabel = JOB_TYPES.find((j) => j.value === profile.jobType)?.label ?? profile.jobType;
  const expLabel = EXPERIENCE_YEARS.find((e) => e.value === profile.experienceYears)?.label ?? profile.experienceYears;
  const skillsText = profile.skills.length > 0 ? profile.skills.join("・") : "（未登録）";
  const platformName = platform === "crowdworks" ? "CrowdWorks" : "ランサーズ";

  const portfolioSection =
    profile.portfolio.length > 0
      ? `\n【ポートフォリオ一覧】\n${profile.portfolio
          .map((p, i) => {
            const tags = p.tags.length > 0 ? `（使用技術：${p.tags.join("・")}）` : "";
            const url = p.url ? ` → ${p.url}` : "";
            return `${i + 1}. ${p.title}${url}\n   ${p.description}${tags}`;
          })
          .join("\n")}\n↑ この中から案件に最も関連するものを1件選び、提案文中で自然に言及すること。`
      : "";

  const similarSection = similarExperience
    ? `\n【類似実績】\n${similarExperience}\n↑ 提案文の中でこの実績に具体的に触れること。`
    : "";

  return `あなたはフリーランス提案文の専門家です。
以下の情報をもとに、${platformName}向けの提案文を1つ作成してください。

【案件情報】
タイトル：${title}
概要：${overview}
予算：${budget}

【提案者プロフィール】
名前：${profile.name || "（未設定）"}
職種：${jobTypeLabel || "（未設定）"}
経験年数：${expLabel || "（未設定）"}
主要スキル：${skillsText}
実績：${profile.achievementSummary || "（未設定）"}
強み・差別化：${profile.strengths || "（未設定）"}
${portfolioSection}${similarSection}

${PLATFORM_STRUCTURE[platform]}

【演出ルール】
- 「〜できます」ではなく「〜の実績があります」の言い回しを使う
- 数字（件数・年数・納期目安）を1〜2箇所必ず入れる
- クライアントの課題・悩みを先読みした共感フレーズを入れる
- 文体トーン：${TONE_INSTRUCTION[tone]}

提案文のみを出力してください。前置きや説明文は不要です。`;
}
