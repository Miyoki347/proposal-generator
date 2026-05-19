"use client";

import { useState } from "react";
import ProposalForm from "@/components/ProposalForm";
import ProposalResult from "@/components/ProposalResult";
import type { ProposalInput, ProposalOutput, GenerateResponse } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<ProposalOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: ProposalInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">提案文ジェネレーター</h1>
          <p className="text-sm text-gray-500 mt-1">CrowdWorks・ランサーズ向けの提案文を自動生成します</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ProposalForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
            {error}
          </div>
        )}

        {result && <ProposalResult result={result} />}
      </div>
    </main>
  );
}
