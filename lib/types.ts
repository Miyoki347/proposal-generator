export type Platform = "crowdworks" | "lancers" | "both";

export interface ProposalInput {
  title: string;
  overview: string;
  budget: string;
  platform: Platform;
}

export interface ProposalOutput {
  crowdworks?: string;
  lancers?: string;
  model: string;
}

export interface GenerateResponse {
  success: boolean;
  data?: ProposalOutput;
  error?: string;
}
