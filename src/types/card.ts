export type Card = {
  attribute: string
  rarity: string
  skill: string
  type: string
  rank: string
  description?: string
}

export type CardMap = Record<string, Card>
