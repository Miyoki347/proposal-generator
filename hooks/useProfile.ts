"use client";

import { useState, useEffect } from "react";
import type { UserProfile } from "@/lib/types";

const STORAGE_KEY = "pg_profile_v1";

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  jobType: "",
  experienceYears: "",
  skills: [],
  achievementSummary: "",
  strengths: "",
  portfolio: [],
  skillPresets: [],
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(stored) });
    } catch {}
    setIsLoaded(true);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    const next = { ...profile, ...updates };
    setProfile(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  return { profile, updateProfile, isLoaded };
}
