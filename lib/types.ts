export type Platform = "crowdworks" | "lancers";
export type ProposalTone = "polite" | "business" | "passionate";

export interface PortfolioItem {
  id: string;
  title: string;
  url?: string;
  description: string;
  tags: string[];
}

export interface SkillPreset {
  id: string;
  nickname: string;
  jobType: string;
  experienceYears: string;
  skills: string[];
  achievementSummary: string;
}

export interface UserProfile {
  name: string;
  jobType: string;
  experienceYears: string;
  skills: string[];
  achievementSummary: string;
  strengths: string;
  portfolio: PortfolioItem[];
  skillPresets: SkillPreset[];
}

export interface ProposalInput {
  title: string;
  overview: string;
  budget: string;
  platform: Platform;
  tone: ProposalTone;
  similarExperience?: string;
  profile: UserProfile;
}

export interface ProposalOutput {
  text: string;
  model: string;
}

export interface GenerateResponse {
  success: boolean;
  data?: ProposalOutput;
  error?: string;
}
