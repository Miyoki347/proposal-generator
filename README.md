# 🤖 フリーランス提案文ジェネレーター

**Claude APIを活用した、クラウドワークス・ランサーズ向け提案文の自動生成ツール**

[![Deploy with Vercel](https://vercel.com/button)](https://proposal-generator-sand.vercel.app/)

🔗 **デモ：** <https://proposal-generator-sand.vercel.app/>

---

## 概要

案件タイトル・概要・予算・媒体を入力するだけで、クラウドワークス・ランサーズなどのフリーランス向けプラットフォームに適した提案文のドラフトを自動生成します。

Claude APIのシステムプロンプトに文体・構成・トーンを定義することで、毎回一貫したクオリティの提案文を素早く作成できます。

## 機能

- 媒体別（クラウドワークス / ランサーズ）の文体切り替え
- 案件カテゴリ（AI・Web・その他）に応じたプロンプト最適化
- プロフィール情報の自動挿入
- 生成文のワンクリックコピー
- Claude API（claude-sonnet）によるストリーミング生成

## 技術スタック

| カテゴリ | 使用技術 |
|---|---|
| フロントエンド | Next.js / React / TypeScript |
| スタイリング | Tailwind CSS |
| AI | Claude API（Anthropic） |
| バックエンド | Next.js API Routes |
| デプロイ | Vercel |

## ローカルでの起動方法

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/proposal-generator.git
cd proposal-generator

# 依存パッケージのインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.local に ANTHROPIC_API_KEY を入力

# 開発サーバーの起動
npm run dev
```

`http://localhost:3000` をブラウザで開いて確認できます。

## 環境変数

```
ANTHROPIC_API_KEY=your_api_key_here
```

APIキーは [Anthropic Console](https://console.anthropic.com/) から取得できます。

---

## 作者

**Miyoki** – AIエンジニア / フロントエンドエンジニア

- Zenn: [zenn.dev/miyoki347](https://zenn.dev/miyoki347)
- Qiita: [qiita.com/miyoki347](https://qiita.com/miyoki347)
- Demo: [proposal-generator-sand.vercel.app](https://proposal-generator-sand.vercel.app/)

---

# 🤖 Freelance Proposal Generator

**An AI-powered proposal drafting tool for Japanese freelance platforms, built with Claude API**

[![Deploy with Vercel](https://vercel.com/button)](https://proposal-generator-sand.vercel.app/)

🔗 **Live Demo:** <https://proposal-generator-sand.vercel.app/>

---

## Overview

Generate polished freelance proposal drafts instantly by entering a job title, description, budget, and target platform. The tool leverages Claude API with carefully crafted system prompts to produce consistent, natural-sounding proposals tailored to each platform's tone and style.

## Features

- Platform-specific tone switching (CrowdWorks / Lancers)
- Category-aware prompt optimization (AI / Web / Other)
- Auto-insertion of profile information
- One-click copy of generated text
- Real-time streaming generation via Claude API

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js / React / TypeScript |
| Styling | Tailwind CSS |
| AI | Claude API (Anthropic) |
| Backend | Next.js API Routes |
| Deployment | Vercel |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/proposal-generator.git
cd proposal-generator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from [Anthropic Console](https://console.anthropic.com/).

## Author

**Miyoki** – AI Engineer / Frontend Developer

- Zenn: [zenn.dev/miyoki](https://zenn.dev/miyoki347)
- Qiita: [qiita.com/miyoki](https://qiita.com/miyoki347)
- Demo: [proposal-generator-sand.vercel.app](https://proposal-generator-sand.vercel.app/)
