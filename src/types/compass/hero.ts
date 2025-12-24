export type HeroInfo = {
  name?: string;
  title?: string;
  role?: string;
  isCollab?: boolean;
  [k: string]: unknown;
}

export type HeroData = Record<string, HeroInfo>;

export default HeroData;
