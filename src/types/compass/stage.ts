export type StageInfo = {
  name?: string;
  difficulty?: string;
  member?: number;
  [k: string]: unknown;
}

export type StageData = Record<string, StageInfo>;

export default StageData;
