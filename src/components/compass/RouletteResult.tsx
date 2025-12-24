"use client"

import React, { useState, useEffect } from "react"
import styles from "./RouletteResult.module.css"
import { CardMap } from "@/types/compass/card"
import { HeroMap } from "@/types/compass/hero"

type Props = {
  lastResult: { hero?: string; cards: string[]; stage?: string } | null
  cardMap: CardMap | null | undefined
  heroMap?: HeroMap | null | undefined
}

export default function RouletteResult({ lastResult, cardMap, heroMap }: Props) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedHero, setSelectedHero] = useState<string | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedCard(null)
        setSelectedHero(null)
      }
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
                      <div className="space-y-2">
                        <table className="w-full text-sm table-fixed">
                          <tbody>
                            <tr className="align-top">
                              <th className="w-28 text-left pr-2 align-top">レアリティ</th>
                              <td className="w-4">:</td>
                              <td className="font-semibold">{info.rarity}</td>
                            </tr>
                            <tr className="align-top">
                              <th className="w-28 text-left pr-2">スキル</th>
                              <td className="w-4">:</td>
                              <td className="font-semibold">{info.skill}</td>
                            </tr>
                            <tr className="align-top">
                              <th className="w-28 text-left pr-2">属性</th>
                              <td className="w-4">:</td>
                              <td className="font-semibold">{info.attribute}</td>
                            </tr>
                            <tr className="align-top">
                              <th className="w-28 text-left pr-2">タイプ</th>
                              <td className="w-4">:</td>
                              <td className="font-semibold">{info.type}</td>
                            </tr>
                            <tr className="align-top">
                              <th className="w-28 text-left pr-2">解放ランク</th>
                              <td className="w-4">:</td>
                              <td className="font-semibold">{info.rank}</td>
                            </tr>
                            {info.description ? (
                              <tr className="align-top">
                                <th className="w-28 text-left pr-2">説明</th>
                                <td className="w-4">:</td>
                                <td className="mt-1 text-xs text-gray-700">{info.description}</td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                      </div>
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
            <div
              className="truncate text-center font-semibold cursor-pointer"
              title={lastResult.hero ?? "--"}
              onClick={() => lastResult?.hero && setSelectedHero(lastResult.hero)}
              role={lastResult?.hero ? "button" : undefined}
              tabIndex={lastResult?.hero ? 0 : undefined}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && lastResult?.hero) setSelectedHero(lastResult.hero)
              }}
            >
              {lastResult.hero ?? "--"}
            </div>
          </div>
        </div>
        {selectedHero ? (
          (() => {
            const info = heroMap?.[selectedHero]
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedHero(null)} />
                <div role="dialog" aria-modal="true" aria-label="ヒーロー詳細" className="relative bg-white text-black rounded shadow-lg max-w-md w-full mx-4 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-semibold">{selectedHero}</h3>
                    <button aria-label="閉じる" className="text-gray-600" onClick={() => setSelectedHero(null)}>×</button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {info ? (
                      <div className="space-y-2">
                        <table className="w-full text-sm table-fixed">
                          <tbody>
                            <tr className="align-top">
                              <th className="w-28 text-left pr-2">ロール</th>
                              <td className="w-4">:</td>
                              <td className="font-semibold">{info.role}</td>
                            </tr>
                            {Object.entries(info.card || {}).length > 0 ? (
                              Object.entries(info.card || {}).map(([k, v], idx) => (
                                <tr className="align-top" key={k}>
                                  <th className="w-28 text-left pr-2">{idx === 0 ? "カード" : ""}</th>
                                  <td className="w-4">{idx === 0 ? ":" : ""}</td>
                                  <td className="font-semibold">{`${k}: ${v}`}</td>
                                </tr>
                              ))
                            ) : (
                              <tr className="align-top">
                                <th className="w-28 text-left pr-2">カード適正</th>
                                <td className="w-4">:</td>
                                <td className="font-semibold">-</td>
                              </tr>
                            )}
                            {info.description ? (
                              <tr className="align-top">
                                <th className="w-28 text-left pr-2">説明</th>
                                <td className="w-4">:</td>
                                <td className="mt-1 text-xs text-gray-700">{info.description}</td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-sm">詳細情報がありません。</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })()
        ) : null}
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
