"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/lib/types";

interface Props {
  items: PortfolioItem[];
  onChange: (items: PortfolioItem[]) => void;
}

const inputBase =
  "w-full px-3 py-2.5 bg-surface border border-line rounded-xl text-[13px] text-ink " +
  "focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/10 transition-colors";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function ItemForm({
  item,
  onSave,
  onCancel,
}: {
  item: Partial<PortfolioItem>;
  onSave: (item: PortfolioItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<PortfolioItem>>(item);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags?.includes(t)) {
      setForm((f) => ({ ...f, tags: [...(f.tags ?? []), t] }));
    }
    setTagInput("");
  };

  const handleSave = () => {
    if (!form.title?.trim()) return;
    onSave({
      id: form.id ?? generateId(),
      title: form.title.trim(),
      url: form.url?.trim() || undefined,
      description: form.description?.trim() ?? "",
      tags: form.tags ?? [],
    });
  };

  return (
    <div className="bg-surface-2 border border-line rounded-xl p-4 space-y-3">
      <input
        type="text"
        value={form.title ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        placeholder="タイトル（必須）"
        className={inputBase}
      />
      <input
        type="text"
        value={form.url ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
        placeholder="URL（任意）"
        className={inputBase}
      />
      <textarea
        value={form.description ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        rows={2}
        placeholder="概要・アピールポイント"
        className={`${inputBase} resize-none`}
      />

      <div className="flex gap-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          placeholder="使用技術タグ（Enterで追加）"
          className="flex-1 px-3 py-2.5 bg-surface border border-line rounded-xl text-[13px] text-ink focus:outline-none focus:border-gold/50 transition-colors"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-3 py-2 rounded-xl border border-line text-[12px] text-dim hover:border-gold/40 hover:text-gold transition-colors"
        >
          追加
        </button>
      </div>

      {(form.tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {(form.tags ?? []).map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] bg-gold/10 border border-gold/25 text-gold">
              {tag}
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, tags: f.tags?.filter((t) => t !== tag) }))}
                className="text-gold/60 hover:text-gold leading-none ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={!form.title?.trim()}
          className="flex-1 py-2.5 rounded-xl bg-gold text-page text-[13px] font-semibold disabled:opacity-40 hover:brightness-105 transition-all"
        >
          保存
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-line text-[13px] text-dim hover:border-line-hover hover:text-ink transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}

export default function PortfolioEditor({ items, onChange }: Props) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) =>
        editingId === item.id ? (
          <ItemForm
            key={item.id}
            item={item}
            onSave={(updated) => { onChange(items.map((i) => (i.id === updated.id ? updated : i))); setEditingId(null); }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <div key={item.id} className="flex items-start gap-3 p-3.5 bg-surface-2 border border-line rounded-xl">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink truncate">{item.title}</p>
              {item.url && <p className="text-[11px] text-dim truncate mt-0.5">{item.url}</p>}
              {item.description && <p className="text-[12px] text-dim mt-1 line-clamp-2">{item.description}</p>}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-gold/10 text-gold border border-gold/20">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-1.5 shrink-0 mt-0.5">
              <button
                type="button"
                onClick={() => setEditingId(item.id)}
                className="px-2.5 py-1.5 rounded-lg border border-line text-[11px] text-dim hover:border-line-hover hover:text-ink transition-colors"
              >
                編集
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((i) => i.id !== item.id))}
                className="px-2.5 py-1.5 rounded-lg border border-danger/25 text-[11px] text-danger/60 hover:border-danger/50 hover:text-danger transition-colors"
              >
                削除
              </button>
            </div>
          </div>
        )
      )}

      {adding ? (
        <ItemForm
          item={{}}
          onSave={(item) => { onChange([...items, item]); setAdding(false); }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="w-full py-3 rounded-xl border border-dashed border-line text-[13px] text-dim hover:border-gold/40 hover:text-gold transition-colors duration-200"
        >
          + ポートフォリオを追加
        </button>
      )}
    </div>
  );
}
