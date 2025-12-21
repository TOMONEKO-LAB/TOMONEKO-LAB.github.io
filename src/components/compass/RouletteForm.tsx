"use client"

import React from "react"
import styles from "./RouletteForm.module.css"
import tgStyles from "./ToggleGroup.module.css"
import ToggleGroup from "./ToggleGroup"

type Props = {
  roleFilters: Record<string, boolean>
  setRoleFilters: (v: Record<string, boolean>) => void
  rarityFilters: Record<string, boolean>
  setRarityFilters: (v: Record<string, boolean>) => void
  typeFilters: Record<string, boolean>
  setTypeFilters: (v: Record<string, boolean>) => void
  includeStage: boolean
  setIncludeStage: (v: boolean) => void
  teamMembers: number
  setTeamMembers: (n: number) => void
  heroCollab: Record<string, boolean>
  setHeroCollab: (s: Record<string, boolean>) => void
}

export default function RouletteForm({ roleFilters, setRoleFilters, rarityFilters, setRarityFilters, typeFilters, setTypeFilters, includeStage, setIncludeStage, teamMembers, setTeamMembers, heroCollab, setHeroCollab }: Props) {
  return (
    <section className={`${styles.root} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-6`}>
      <div className="col-span-full">
        <ToggleGroup label="ヒーローロール" items={Object.keys(roleFilters)} selected={roleFilters} onChange={setRoleFilters} ariaPrefix="role" />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            aria-pressed={!!heroCollab["コラボ"]}
            onClick={() => setHeroCollab({ ...heroCollab, ["コラボ"]: !heroCollab["コラボ"] })}
            className={`${tgStyles.btn} ${heroCollab["コラボ"] ? tgStyles.selected : tgStyles.unselected}`}
          >
            コラボ
          </button>
          <button
            type="button"
            aria-pressed={!!heroCollab["通常"]}
            onClick={() => setHeroCollab({ ...heroCollab, ["通常"]: !heroCollab["通常"] })}
            className={`${tgStyles.btn} ${heroCollab["通常"] ? tgStyles.selected : tgStyles.unselected}`}
          >
            通常
          </button>
        </div>
      </div>

      <div className="col-span-full">
        <ToggleGroup label="カードレアリティ" items={Object.keys(rarityFilters)} selected={rarityFilters} onChange={setRarityFilters} ariaPrefix="rarity" />
      </div>

      <div className="col-span-full">
        <ToggleGroup label="カードタイプ" items={Object.keys(typeFilters)} selected={typeFilters} onChange={setTypeFilters} ariaPrefix="type" />
      </div>

      <div className="col-span-full">
        <div>
          <button
            type="button"
            aria-pressed={includeStage}
            aria-label="ステージを含める"
            onClick={() => setIncludeStage(!includeStage)}
            className={`${tgStyles.btn} ${includeStage ? tgStyles.selected : tgStyles.unselected}`}
          >
            ステージを含める
          </button>
        </div>
        {includeStage ? (
          <div className="mt-2">
            <label className="block mb-1">チーム人数</label>
            <div className="flex gap-2">
              <button
                type="button"
                aria-pressed={teamMembers === 2}
                aria-label="チーム人数2"
                onClick={() => setTeamMembers(2)}
                className={`${tgStyles.btn} ${teamMembers === 2 ? tgStyles.selected : tgStyles.unselected}`}
              >
                2人
              </button>

              <button
                type="button"
                aria-pressed={teamMembers === 3}
                aria-label="チーム人数3"
                onClick={() => setTeamMembers(3)}
                className={`${tgStyles.btn} ${teamMembers === 3 ? tgStyles.selected : tgStyles.unselected}`}
              >
                3人
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
