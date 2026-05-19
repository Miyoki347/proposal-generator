"use client";

import type { Platform, ProposalInput } from "@/lib/types";

interface Props {
  onSubmit: (input: ProposalInput) => void;
  loading: boolean;
}

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "crowdworks", label: "CrowdWorks" },
  { value: "lancers", label: "ランサーズ" },
  { value: "both", label: "両方" },
];

export default function ProposalForm({ onSubmit, loading }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    onSubmit({
      title: data.get("title") as string,
      overview: data.get("overview") as string,
      budget: data.get("budget") as string,
      platform: data.get("platform") as Platform,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          案件タイトル <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="例：ECサイトのLP制作をお願いしたい"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          案件概要 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="overview"
          required
          rows={4}
          placeholder="例：商品数20点のECサイト向けLP。Figmaデザインあり。React実装希望。"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          予算 <span className="text-red-500">*</span>
        </label>
        <input
          name="budget"
          type="text"
          required
          placeholder="例：3万円〜5万円"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          プラットフォーム <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3">
          {PLATFORMS.map(({ value, label }) => (
            <label key={value} className="flex-1 cursor-pointer">
              <input type="radio" name="platform" value={value} defaultChecked={value === "both"} className="sr-only peer" />
              <div className="text-center py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all">
                {label}
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
      >
        {loading ? "生成中..." : "提案文を生成する"}
      </button>
    </form>
  );
}
