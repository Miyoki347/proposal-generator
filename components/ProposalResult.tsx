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
      className={`text-[11px] px-3 py-1.5 rounded-lg border font-medium transition-all duration-200 min-h-[32px] ${
        copied
          ? "border-gold/30 text-gold"
          : "border-line text-dim hover:border-line-hover hover:text-ink"
      }`}
      style={copied ? { background: "rgba(240,164,41,0.08)" } : undefined}
    >
      {copied ? "✓ コピー済み" : "コピー"}
    </button>
  );
}

export default function ProposalResult({ result }: Props) {
  const { text, model } = result;

  return (
    <div className="mt-8 space-y-4">
      <div
        className="flex items-center justify-between"
        style={{ animation: "fadeInUp 0.4s ease both" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3 rounded-full" style={{ background: "rgba(240,164,41,0.5)" }} />
          <h2 className="font-heading text-[10px] font-semibold text-dim tracking-[0.18em] uppercase">
            Generated Proposal
          </h2>
        </div>
        <span className="text-[11px] text-faint font-mono">model: {model}</span>
      </div>

      <div
        className="bg-surface border border-line rounded-2xl overflow-hidden"
        style={{ animation: "fadeInUp 0.5s 0.05s ease both" }}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-surface-2">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[13px] font-medium text-ink">生成された提案文</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-dim">{text.length}字</span>
            <CopyButton text={text} />
          </div>
        </div>
        <div className="p-5">
          <p
            className="text-[13px] whitespace-pre-wrap"
            style={{ color: "rgba(240,237,230,0.92)", lineHeight: "1.95" }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
