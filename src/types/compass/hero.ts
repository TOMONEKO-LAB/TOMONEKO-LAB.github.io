export type Hero = {
  role: string
  card: Record<string, string>
  isCollab: boolean
  description?: string
}

export type HeroMap = Record<string, Hero>