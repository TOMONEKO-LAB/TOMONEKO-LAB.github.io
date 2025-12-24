export type CardInfo = {
  attribute?: string;
  rarity?: string;
  skill?: string;
  type?: string;
  rank?: string;
  [k: string]: unknown;
}

export type CardData = Record<string, CardInfo>;

export default CardData;
