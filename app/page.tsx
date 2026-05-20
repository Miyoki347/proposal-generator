"use client";

import { useState } from "react";
import ProposalForm, { type ProposalFormData } from "@/components/ProposalForm";
import ProposalResult from "@/components/ProposalResult";
import ProfilePanel from "@/components/ProfilePanel";
import { useProfile } from "@/hooks/useProfile";
import type { ProposalOutput, GenerateResponse, ProposalInput } from "@/lib/types";

export default function Home() {
  const { profile, updateProfile, isLoaded } = useProfile();
  const [result, setResult] = useState<ProposalOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ProposalFormData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const input: ProposalInput = { ...formData, profile };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json: GenerateResponse = await res.json();

      if (!json.success || !json.data) {
        setError(json.error ?? "不明なエラーが発生しました");
        return;
      }

      setResult(json.data);
    } catch {
      setError("通信エラーが発生しました。しばらく経ってから再試行してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-page">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 35% at 50% -5%, rgba(240,164,41,0.08) 0%, transparent 100%)" }}
      />

      <div className="relative max-w-xl mx-auto px-4 py-12 pb-24">
        {/* Header */}
        <header className="mb-8" style={{ animation: "fadeInUp 0.5s ease both" }}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-0.5 h-4 rounded-full bg-gold" />
            <span
              className="font-heading text-[10px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: "rgba(240,164,41,0.6)" }}
            >
              AI Proposal Generator
            </span>
          </div>
          <h1 className="font-heading text-[2rem] font-extrabold text-ink leading-[1.15] tracking-tight">
            提案文<br />ジェネレーター
          </h1>
          <p className="text-[13px] text-dim mt-3 leading-relaxed">
            案件情報を入れるだけで、CW・ランサーズ向けの<br className="hidden sm:inline" />
            提案文ドラフトを自動生成します
          </p>
        </header>

        {/* Profile Panel */}
        {isLoaded && (
          <div className="mb-4" style={{ animation: "fadeInUp 0.5s 0.05s ease both" }}>
            <ProfilePanel profile={profile} onChange={updateProfile} />
          </div>
        )}

        {/* Form card */}
        <div
          className="bg-surface border border-line rounded-2xl p-6"
          style={{ animation: "fadeInUp 0.5s 0.1s ease both" }}
        >
          <ProposalForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div
            className="mt-4 px-4 py-3.5 rounded-xl border text-[13px] leading-relaxed"
            style={{
              animation: "fadeInUp 0.4s ease both",
              background: "rgba(255,107,114,0.08)",
              borderColor: "rgba(255,107,114,0.2)",
              color: "#FF6B72",
            }}
          >
            {error}
          </div>
        )}

        {/* Result */}
        {result && <ProposalResult result={result} />}
      </div>
    </main>
  );
}
