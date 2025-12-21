"use client"

import React from "react"
import styles from "./ToggleGroup.module.css"

type Props = {
  label?: string
  items: string[]
  selected: Record<string, boolean>
  onChange: (v: Record<string, boolean>) => void
  ariaPrefix?: string
}

export default function ToggleGroup({ label, items, selected, onChange, ariaPrefix = "item" }: Props) {
  const abbreviations: Record<string, string> = {
    アタッカー: "アタ",
    ガンナー: "ガン",
    スプリンター: "スプ",
    タンク: "タン",
  }
  return (
    <div>
      {label ? <label className="block mb-1">{label}</label> : null}
      <div className={styles.container} role="group" aria-label={label ?? "toggle-group"}>
        {items.map((key) => {
          const isSel = !!selected[key]
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isSel}
              aria-label={`${ariaPrefix} ${key}`}
              className={`${styles.btn} ${isSel ? styles.selected : styles.unselected} select-none`}
              onClick={() => onChange({ ...selected, [key]: !isSel })}
            >
              <span className={styles.labelFull}>{key}</span>
              <span className={styles.labelShort}>{abbreviations[key] ?? key}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
