"use client"

import React from "react"
import styles from "./RouletteButtons.module.css"

type Props = {
  onRoll: () => void
}

export default function RouletteButtons({ onRoll }: Props) {
  return (
    <div className={`col-span-full ${styles.root} flex justify-center items-stretch sm:items-center gap-3`}>
      <button type="button" aria-label="ルーレットを回す" onClick={onRoll} className={`bg-orange-600 text-white px-4 py-3 rounded w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${styles.primary}`}>ルーレットを回す</button>
    </div>
  )
}
