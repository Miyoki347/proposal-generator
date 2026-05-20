"use client";

import { useState } from "react";
import type { UserProfile, SkillPreset } from "@/lib/types";
import { JOB_TYPES, EXPERIENCE_YEARS, STRENGTH_SUGGESTIONS } from "@/lib/presets";
import PortfolioEditor from "./PortfolioEditor";

interface Props {
  profile: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

const inputBase =
  "w-full px-4 py-3 bg-surface-2 border border-line rounded-xl text-[14px] text-ink " +
  "focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-colors duration-200";

const selectBase =
  "w-full px-4 py-3 bg-surface-2 border border-line rounded-xl text-[14px] text-ink " +
  "focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-colors duration-200";

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[11px] font-semibold text-dim tracking-wider uppercase font-heading mb-2">
      {label}
    </p>
  );
}

export default function ProfilePanel({ profile, onChange }: Props) {
  const [open, setOpen] = useState(!profile.name && !profile.jobType);
  const [customSkill, setCustomSkill] = useState("");
  const [presetNickname, setPresetNickname] = useState("");
  const [showPresetSave, setShowPresetSave] = useState(false);
  const [showStrengthSuggestions, setShowStrengthSuggestions] = useState(false);

  const strengthSuggestions = profile.jobType ? (STRENGTH_SUGGESTIONS[profile.jobType] ?? []) : [];

  const savePreset = () => {
    const name = presetNickname.trim();
    if (!name) return;
    const newPreset: SkillPreset = {
      id: Date.now().toString(),
      nickname: name,
      jobType: profile.jobType,
      experienceYears: profile.experienceYears,
      skills: [...profile.skills],
      achievementSummary: profile.achievementSummary,
    };
    onChange({ skillPresets: [...(profile.skillPresets ?? []), newPreset] });
    setPresetNickname("");
    setShowPresetSave(false);
  };

  const loadPreset = (preset: SkillPreset) => {
    onChange({
      jobType: preset.jobType,
      experienceYears: preset.experienceYears,
      skills: [...preset.skills],
      achievementSummary: preset.achievementSummary,
    });
  };

  const deletePreset = (id: string) => {
    onChange({ skillPresets: (profile.skillPresets ?? []).filter((p) => p.id !== id) });
  };

  const currentJobType = JOB_TYPES.find((j) => j.value === profile.jobType);
  const presetSkills = currentJobType?.skills ?? [];
  const customSkills = profile.skills.filter((s) => !presetSkills.includes(s));

  const toggleSkill = (skill: string) => {
    const next = profile.skills.includes(skill)
      ? profile.skills.filter((s) => s !== skill)
      : [...profile.skills, skill];
    onChange({ skills: next });
  };

  const addCustomSkill = () => {
    const t = customSkill.trim();
    if (t && !profile.skills.includes(t)) onChange({ skills: [...profile.skills, t] });
    setCustomSkill("");
  };

  const summaryText =
    [profile.name, JOB_TYPES.find((j) => j.value === profile.jobType)?.label]
      .filter(Boolean)
      .join(" · ") || "未設定";

  return (
    <div className="bg-surface border border-line rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-2 transition-colors duration-150"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-0.5 h-4 rounded-full bg-gold shrink-0" />
          <span className="font-heading text-[11px] font-semibold text-ink tracking-[0.15em] uppercase shrink-0">
            プロフィール設定
          </span>
          {!open && (
            <span className="text-[12px] text-dim truncate ml-1">
              {summaryText === "未設定" ? (
                <span className="text-gold/70">← クリックして設定</span>
              ) : summaryText}
            </span>
          )}
        </div>
        <span className="text-dim text-lg leading-none shrink-0 ml-2">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-line px-5 pb-6 pt-5 space-y-5">
          {/* スキルセットプリセット */}
          {(profile.skillPresets ?? []).length > 0 && (
            <div>
              <SectionLabel label="保存済みスキルセット" />
              <div className="flex flex-wrap gap-1.5">
                {(profile.skillPresets ?? []).map((preset) => (
                  <div key={preset.id} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-2 border border-line text-[12px] group">
                    <button
                      type="button"
                      onClick={() => loadPreset(preset)}
                      className="text-dim hover:text-ink transition-colors"
                    >
                      {preset.nickname}
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePreset(preset.id)}
                      className="text-faint hover:text-danger transition-colors leading-none ml-0.5"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 名前 */}
          <div>
            <SectionLabel label="アカウント名・名前" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="例：田中 太郎"
              className={inputBase}
            />
          </div>

          {/* 職種 + 経験年数 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <SectionLabel label="職種" />
              <select
                value={profile.jobType}
                onChange={(e) => onChange({ jobType: e.target.value, skills: [] })}
                className={selectBase}
              >
                <option value="">選択してください</option>
                {JOB_TYPES.map((j) => (
                  <option key={j.value} value={j.value}>{j.label}</option>
                ))}
              </select>
            </div>
            <div>
              <SectionLabel label="経験年数" />
              <select
                value={profile.experienceYears}
                onChange={(e) => onChange({ experienceYears: e.target.value })}
                className={selectBase}
              >
                <option value="">選択してください</option>
                {EXPERIENCE_YEARS.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* スキル */}
          <div>
            <SectionLabel label="スキル" />
            {presetSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {presetSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all duration-150 ${
                      profile.skills.includes(skill)
                        ? "bg-gold/12 border-gold/40 text-gold"
                        : "bg-surface-2 border-line text-dim hover:border-line-hover hover:text-ink"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomSkill(); } }}
                placeholder="カスタムスキルを追加（Enter）"
                className="flex-1 px-3 py-2.5 bg-surface-2 border border-line rounded-xl text-[13px] text-ink focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-3 py-2 rounded-xl border border-line text-[12px] text-dim hover:border-gold/40 hover:text-gold transition-colors"
              >
                追加
              </button>
            </div>

            {customSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {customSkills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-gold/12 border border-gold/40 text-gold">
                    {skill}
                    <button
                      type="button"
                      onClick={() => onChange({ skills: profile.skills.filter((s) => s !== skill) })}
                      className="text-gold/60 hover:text-gold leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 実績サマリー */}
          <div>
            <SectionLabel label="実績サマリー" />
            <textarea
              value={profile.achievementSummary}
              onChange={(e) => onChange({ achievementSummary: e.target.value })}
              rows={2}
              placeholder="例：LP制作50件以上、平均満足度★4.8、納期遵守率100%"
              className={`${inputBase} resize-none leading-relaxed`}
            />
          </div>

          {/* セット保存 */}
          <div>
            {!showPresetSave ? (
              <button
                type="button"
                onClick={() => setShowPresetSave(true)}
                className="text-[11px] text-dim hover:text-gold border border-line hover:border-gold/40 px-3 py-1.5 rounded-lg transition-colors"
              >
                + 現在の職種・スキル・実績をセットで保存
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={presetNickname}
                  onChange={(e) => setPresetNickname(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); savePreset(); } if (e.key === "Escape") setShowPresetSave(false); }}
                  placeholder="セット名（例：Webデザイン案件用）"
                  autoFocus
                  className="flex-1 px-3 py-2 bg-surface-2 border border-gold/40 rounded-xl text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-gold/10 transition-colors"
                />
                <button
                  type="button"
                  onClick={savePreset}
                  className="px-3 py-2 rounded-xl bg-gold/12 border border-gold/40 text-[12px] text-gold hover:bg-gold/20 transition-colors"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPresetSave(false); setPresetNickname(""); }}
                  className="px-3 py-2 rounded-xl border border-line text-[12px] text-dim hover:text-ink transition-colors"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* 強み */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-dim tracking-wider uppercase font-heading">強み・差別化ポイント</p>
              {strengthSuggestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowStrengthSuggestions(!showStrengthSuggestions)}
                  className="text-[10px] text-gold/70 hover:text-gold border border-gold/20 hover:border-gold/40 px-2 py-1 rounded-md transition-colors"
                >
                  {showStrengthSuggestions ? "閉じる" : "おすすめを見る"}
                </button>
              )}
            </div>
            {showStrengthSuggestions && strengthSuggestions.length > 0 && (
              <div className="mb-2 space-y-1.5">
                {strengthSuggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { onChange({ strengths: s }); setShowStrengthSuggestions(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-surface-2 border border-line hover:border-gold/40 text-[12px] text-dim hover:text-ink transition-colors leading-relaxed"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <textarea
              value={profile.strengths}
              onChange={(e) => onChange({ strengths: e.target.value })}
              rows={2}
              placeholder="例：デザインから実装まで一貫対応。スピード納品（最短2営業日）が強み"
              className={`${inputBase} resize-none leading-relaxed`}
            />
          </div>

          {/* ポートフォリオ */}
          <div>
            <SectionLabel label="ポートフォリオ" />
            <PortfolioEditor
              items={profile.portfolio}
              onChange={(portfolio) => onChange({ portfolio })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
