"use client";

import { useState } from "react";
import type { Platform, ProposalTone } from "@/lib/types";
import { TONES } from "@/lib/presets";

export interface ProposalFormData {
  title: string;
  overview: string;
  budget: string;
  platform: Platform;
  tone: ProposalTone;
  similarExperience: string;
}

interface Props {
  onSubmit: (data: ProposalFormData) => void;
  loading: boolean;
}

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "crowdworks", label: "CrowdWorks" },
  { value: "lancers", label: "ランサーズ" },
];

const inputBase =
  "w-full px-4 py-3 bg-surface-2 border border-line rounded-xl text-[14px] text-ink " +
  "focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-colors duration-200";

function FieldLabel({ step, label, optional }: { step: string; label: string; optional?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 mb-2">
      <span className="font-heading text-[10px] font-bold tracking-widest" style={{ color: "rgba(240,164,41,0.45)" }}>
        {step}
      </span>
      <span className="text-[13px] font-medium text-dim">{label}</span>
      {optional && <span className="text-[11px] text-faint">任意</span>}
    </div>
  );
}

function SegmentControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1.5 bg-surface-2 border border-line p-1 rounded-xl">
      {options.map(({ value: v, label }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
            value === v ? "bg-gold text-page font-semibold shadow-sm" : "text-dim hover:text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function ProposalForm({ onSubmit, loading }: Props) {
  const [platform, setPlatform] = useState<Platform>("crowdworks");
  const [tone, setTone] = useState<ProposalTone>("polite");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit({
      title: data.get("title") as string,
      overview: data.get("overview") as string,
      budget: data.get("budget") as string,
      similarExperience: (data.get("similarExperience") as string) || "",
      platform,
      tone,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <FieldLabel step="01" label="案件タイトル" />
        <input name="title" type="text" required placeholder="例：ECサイトのLP制作をお願いしたい" className={inputBase} />
      </div>

      <div>
        <FieldLabel step="02" label="案件概要" />
        <textarea
          name="overview"
          required
          rows={4}
          placeholder="例：商品数20点のECサイト向けLP。Figmaデザインあり。React実装希望。"
          className={`${inputBase} resize-none leading-relaxed`}
        />
      </div>

      <div>
        <FieldLabel step="03" label="予算" />
        <input name="budget" type="text" required placeholder="例：3万円〜5万円" className={inputBase} />
      </div>

      <div>
        <FieldLabel step="04" label="類似実績" optional />
        <input
          name="similarExperience"
          type="text"
          placeholder="例：同様のECサイトLP制作を3件担当した経験あり"
          className={inputBase}
        />
      </div>

      <div>
        <FieldLabel step="05" label="提案先" />
        <SegmentControl options={PLATFORMS} value={platform} onChange={setPlatform} />
      </div>

      <div>
        <FieldLabel step="06" label="提案トーン" />
        <SegmentControl options={TONES} value={tone} onChange={setTone} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 mt-1 rounded-xl bg-gold text-page font-heading font-bold text-[15px] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 min-h-[52px] flex items-center justify-center"
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = "0 0 28px rgba(240,164,41,0.35)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; }}
      >
        {loading ? (
          <span className="flex items-center gap-2.5">
            <span className="text-[14px]">生成中</span>
            <span className="flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-page/50 inline-block"
                  style={{ animation: `dot-pulse 1.1s ${i * 0.16}s ease-in-out infinite` }} />
              ))}
            </span>
          </span>
        ) : "提案文を生成する"}
      </button>
    </form>
  );
}
