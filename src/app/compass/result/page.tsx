"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useCompassData from "@/hooks/useCompassData"
import RouletteResult from "@/components/compass/RouletteResult"

export default function ResultPage() {
  const router = useRouter()
  const { cards: cardMap, heroes: heroMap, stages: stageMap } = useCompassData()
  const [lastResult, setLastResult] = useState<{ hero?: string; cards: string[]; stage?: string } | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function pickRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function doRerollFromSession() {
    try {
      const rfRaw = sessionStorage.getItem("compass-roleFilters")
      const rarRaw = sessionStorage.getItem("compass-rarityFilters")
      const tfRaw = sessionStorage.getItem("compass-typeFilters")
      const isRaw = sessionStorage.getItem("compass-includeStage")
      const tmRaw = sessionStorage.getItem("compass-teamMembers")

      const roleFilters: Record<string, boolean> = rfRaw ? JSON.parse(rfRaw) : { アタッカー: true, ガンナー: true, タンク: true, スプリンター: true }
      const rarityFilters: Record<string, boolean> = rarRaw ? JSON.parse(rarRaw) : { N: true, R: true, SR: true, UR: true }
      const typeFilters: Record<string, boolean> = tfRaw ? JSON.parse(tfRaw) : { "通常": true, "コラボ": true, "シーズン": true, "イベント": true }
      const includeStage: boolean = isRaw ? JSON.parse(isRaw) : true
      const teamMembers: number = tmRaw ? JSON.parse(tmRaw) : 3
      const hcRaw = sessionStorage.getItem("compass-heroCollab")
      const heroCollab: Record<string, boolean> = hcRaw ? JSON.parse(hcRaw) : { コラボ: true, 通常: true }

      const enabledRoles = Object.entries(roleFilters).filter(([, v]) => v).map(([k]) => k)
      const enabledRarities = Object.entries(rarityFilters).filter(([, v]) => v).map(([k]) => k)
      const enabledTypes = Object.entries(typeFilters).filter(([, v]) => v).map(([k]) => k)
      const errors: string[] = []
      if (!enabledRoles.length) errors.push("ヒーローロール")
      if (!enabledRarities.length) errors.push("カードレアリティ")
      if (!enabledTypes.length) errors.push("カードタイプ")
      if (!heroCollab["コラボ"] && !heroCollab["通常"]) errors.push("コラボ/通常")
      if (errors.length) {
        setValidationErrors(errors)
        return
      }

      const allChars = Object.keys(heroMap || {})
      const allCards = Object.keys(cardMap || {})
      const allStages = Object.keys(stageMap || {})

      const heroPool = allChars.filter((h) => {
        const info = heroMap?.[h]
        if (!info) return true
        const roleOk = enabledRoles.includes(info.role)
        const collabOk = (info.isCollab && heroCollab["コラボ"]) || (!info.isCollab && heroCollab["通常"]) || false
        return roleOk && collabOk
      })

      const chosenHero = heroPool.length ? pickRandom(heroPool) : allChars.length ? pickRandom(allChars) : undefined

      const filteredCards = allCards.filter((c) => {
        const info = cardMap?.[c]
        if (!info) return true
        const rarityOk = enabledRarities.includes(info.rarity)
        const typeOk = enabledTypes.includes(info.type ?? "通常")
        return rarityOk && typeOk
      })

      const selected: string[] = []
      const cardsBySkill: Record<string, string[]> = {}
      for (const name of filteredCards) {
        const info = cardMap?.[name]
        const skill = info?.skill ?? "other"
        ;(cardsBySkill[skill] ||= []).push(name)
      }

      for (const skill of Object.keys(cardsBySkill)) {
        if (selected.length >= 4) break
        selected.push(pickRandom(cardsBySkill[skill]))
      }
      const remainingPool = filteredCards.filter((n) => !selected.includes(n))
      while (selected.length < 4 && remainingPool.length) {
        const r = pickRandom(remainingPool)
        selected.push(r)
        remainingPool.splice(remainingPool.indexOf(r), 1)
      }

      let chosenStage: string | undefined
      if (includeStage) {
        const stagePool = allStages.filter((s) => (stageMap?.[s]?.member ?? teamMembers) === teamMembers)
        chosenStage = stagePool.length ? pickRandom(stagePool) : allStages.length ? pickRandom(allStages) : undefined
      }

      const result = { hero: chosenHero, cards: selected, stage: chosenStage }
      setLastResult(result)
      try {
        sessionStorage.setItem("compass-lastResult", JSON.stringify(result))
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("compass-lastResult")
      if (raw) setLastResult(JSON.parse(raw))
      else {
        // if no previous result, generate one from stored filters
        doRerollFromSession()
      }
    } catch (e) {
      // ignore
    }
  }, [cardMap, heroMap, stageMap])


  return (
    <main className="min-h-screen p-6 sm:p-8 max-w-4xl mx-auto bg-white text-black">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">ルーレット結果</h1>

      <section role="region" aria-live="polite" aria-labelledby="result-heading">
        <h2 id="result-heading" className="text-xl font-semibold mb-2">結果</h2>
        <RouletteResult lastResult={lastResult} cardMap={cardMap} />
      </section>

      <div className="mt-6 flex gap-3 justify-center">
        <button onClick={() => router.push('/compass')} className="border px-4 py-2 rounded">条件に戻る</button>
        <button onClick={() => doRerollFromSession()} className="bg-blue-600 text-white px-4 py-2 rounded">もう一度回す</button>
      </div>
      {validationErrors.length > 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setValidationErrors([])} />
          <div className="relative bg-white text-black rounded shadow-lg max-w-md w-full mx-4 p-4">
            <h3 className="text-lg font-semibold">条件を選択してください</h3>
            <div className="mt-2 text-sm">
              {validationErrors.map((s) => (
                <div key={s}>「{s}」は必ず一つ以上選択してください。</div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button className="px-3 py-1 border rounded" onClick={() => setValidationErrors([])}>閉じる</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
