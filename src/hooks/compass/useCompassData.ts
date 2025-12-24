"use client";

import { useEffect, useState } from "react";
import { CardMap } from "@/types/compass/card";
import { HeroMap } from "@/types/compass/hero";
import { StageMap } from "@/types/compass/stage";

export default function useCompassData() {
  const [cards, setCards] = useState<CardMap>({});
  const [heroes, setHeroes] = useState<HeroMap>({});
  const [stages, setStages] = useState<StageMap>({});

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
