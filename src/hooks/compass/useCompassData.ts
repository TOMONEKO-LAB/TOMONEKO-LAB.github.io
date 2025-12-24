"use client";

import { useEffect, useState } from "react";
import { CardData } from "@/types/compass/card";
import { HeroData } from "@/types/compass/hero";
import { StageData } from "@/types/compass/stage";

export default function useCompassData() {
  const [cards, setCards] = useState<CardData>({});
  const [heroes, setHeroes] = useState<HeroData>({});
  const [stages, setStages] = useState<StageData>({});

  useEffect(() => {
    fetch('/api/compass/cards')
      .then((r) => r.json())
      .then((data) => setCards(data || {}))
      .catch(() => setCards({}));
    fetch('/api/compass/heroes')
      .then((r) => r.json())
      .then((data) => setHeroes(data || {}))
      .catch(() => setHeroes({}));
    fetch('/api/compass/stages')
      .then((r) => r.json())
      .then((data) => setStages(data || {}))
      .catch(() => setStages({}));
  }, []);

  return { cards, heroes, stages };
}
