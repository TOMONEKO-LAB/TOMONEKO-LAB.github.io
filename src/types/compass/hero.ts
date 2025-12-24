export type HeroInfo = {
  name?: string;
  title?: string;
  [k: string]: unknown;
}

export type HeroData = Record<string, HeroInfo>;

export default HeroData;
