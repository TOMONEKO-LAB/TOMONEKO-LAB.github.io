"use client"

import React, { useState, useEffect } from "react"
import styles from "./RouletteResult.module.css"
import { Card, CardMap } from "../../types/card"

type Props = {
  lastResult: { hero?: string; cards: string[]; stage?: string } | null
  cardMap: CardMap | null | undefined
}

export default function RouletteResult({ lastResult, cardMap }: Props) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedCard(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (!lastResult) {
    return <p className="text-black">まだ結果がありません。ルーレットを回してください。</p>
  }

  return (
    <div className={`${styles.root} space-y-4 text-black`}>
      <div>
      {/* Modal for card details */}
      {selectedCard ? (
        (() => {
          const info = cardMap?.[selectedCard]
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedCard(null)} />
              <div role="dialog" aria-modal="true" aria-label="カード詳細" className="relative bg-white text-black rounded shadow-lg max-w-md w-full mx-4 p-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-semibold">{selectedCard}</h3>
                  <button aria-label="閉じる" className="text-gray-600" onClick={() => setSelectedCard(null)}>×</button>
                </div>
                <div className="mt-3 space-y-2">
                  {info ? (
                    <>
                      <div className="text-sm">レアリティ: <span className="font-semibold">{info.rarity}</span></div>
                      <div className="text-sm">スキル: <span className="font-semibold">{info.skill}</span></div>
                      <div className="text-sm">属性: <span className="font-semibold">{info.attribute}</span></div>
                      <div className="text-sm">タイプ: <span className="font-semibold">{info.type}</span></div>
                      <div className="text-sm">解放ランク: <span className="font-semibold">{info.rank}</span></div>
                      {info.description ? <div className="text-sm">説明: <div className="mt-1 text-xs text-gray-700">{info.description}</div></div> : null}
                    </>
                  ) : (
                    <div className="text-sm">詳細情報がありません。</div>
                  )}
                </div>
              </div>
            </div>
          )
        })()
      ) : null}
        <div className={styles.hero}>
          <strong>ヒーロー</strong>
          <div className="p-3 border rounded mt-2 bg-white shadow-sm text-black">
            <div className="truncate text-center font-semibold" title={lastResult.hero ?? "--"}>{lastResult.hero ?? "--"}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <strong>カード（4枚）</strong>
        </div>

        <div className="mt-3 space-y-3">
          {lastResult.cards.map((name: string) => {
            return (
              <div key={name} className="p-3 border rounded bg-white shadow-sm flex items-center justify-center gap-3">
                <div className="min-w-0 w-full">
                  <div
                    className="font-semibold truncate text-sm sm:text-base text-black cursor-pointer text-center"
                    title={name}
                    onClick={() => setSelectedCard(name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedCard(name)
                    }}
                  >
                    {name}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {lastResult.stage ? (
        <div>
          <strong>ステージ</strong>
          <div className="p-3 border rounded mt-2 bg-white shadow-sm text-black">
            <div className="truncate text-center font-semibold" title={lastResult.stage ?? "--"}>{lastResult.stage}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
