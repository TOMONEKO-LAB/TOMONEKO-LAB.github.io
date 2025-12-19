export type Hero = {
  role: string
  card: Record<string, string>
  isCollab: boolean
}

export type HeroMap = Record<string, Hero>
