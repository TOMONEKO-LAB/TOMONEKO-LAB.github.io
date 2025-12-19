"use client"

import { useEffect, useState } from "react"
import type { CardMap } from "../types/card"
import type { HeroMap } from "../types/hero"
import type { StageMap } from "../types/stage"

export default function useCompassData() {
  const [cards, setCards] = useState<CardMap | null>(null)
  const [heroes, setHeroes] = useState<HeroMap | null>(null)
  const [stages, setStages] = useState<StageMap | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [cRes, hRes, sRes] = await Promise.all([
          fetch("/compass/card.json"),
          fetch("/compass/hero.json"),
          fetch("/compass/stage.json")
        ])

        if (cRes.ok) setCards(await cRes.json())
        if (hRes.ok) setHeroes(await hRes.json())
        if (sRes.ok) setStages(await sRes.json())
      } catch (e) {
        // ignore — fallback handled by caller
        console.error("useCompassData load error", e)
      }
    }
    load()
  }, [])

  return { cards, heroes, stages }
}
