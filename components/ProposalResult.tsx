"use client";

import { useState } from "react";
import type { ProposalOutput } from "@/lib/types";

interface Props {
  result: ProposalOutput;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px]"
    >
      {copied ? "コピー済み ✓" : "コピー"}
    </button>
  );
}

function ProposalCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-indigo-700">{label}</span>
        <CopyButton text={text} />
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  );
}

export default function ProposalResult({ result }: Props) {
  const { crowdworks, lancers, model } = result;

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">生成結果</h2>
        <span className="text-xs text-gray-400">使用モデル：{model}</span>
      </div>

      {crowdworks && <ProposalCard label="CrowdWorks 向け提案文" text={crowdworks} />}
      {lancers && <ProposalCard label="ランサーズ 向け提案文" text={lancers} />}
    </div>
  );
}
