"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useCompassData from "@/hooks/compass/useCompassData"
import RouletteForm from "@/components/compass/RouletteForm"
import RouletteButtons from "@/components/compass/RouletteButtons"

export default function CompassPage() {
  const { cards: cardMap, heroes: heroMap, stages: stageMap } = useCompassData()

  const router = useRouter()

  const [roleFilters, setRoleFilters] = useState<Record<string, boolean>>({
    アタッカー: false,
    ガンナー: false,
    タンク: false,
    スプリンター: false,
  })
  const [rarityFilters, setRarityFilters] = useState<Record<string, boolean>>({ N: false, R: false, SR: false, UR: false })
  const [typeFilters, setTypeFilters] = useState<Record<string, boolean>>({ "通常": false, "コラボ": false, "シーズン": false, "イベント": false })
  const [includeStage, setIncludeStage] = useState(false)
  const [teamMembers, setTeamMembers] = useState<number>(3)
  const [heroCollab, setHeroCollab] = useState<Record<string, boolean>>({ コラボ: false, 通常: false })
  const [lastResult, setLastResult] = useState<{ hero?: string; cards: string[]; stage?: string } | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function pickRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function roll() {
    const allChars = Object.keys(heroMap || {})
    const allCards = Object.keys(cardMap || {})
    const allStages = Object.keys(stageMap || {})
    const enabledRoles = Object.entries(roleFilters).filter(([, v]) => v).map(([k]) => k)
    const heroPool = allChars.filter((h) => {
      const info = heroMap?.[h]
      if (!info) return true
      const roleOk = enabledRoles.includes(info.role)
      const collabOk = (info.isCollab && heroCollab["コラボ"]) || (!info.isCollab && heroCollab["通常"]) || false
      return roleOk && collabOk
    })

    // validation: require at least one selection in each of these groups
    const enabledRarities = Object.entries(rarityFilters).filter(([, v]) => v).map(([k]) => k)
    const enabledTypes = Object.entries(typeFilters).filter(([, v]) => v).map(([k]) => k)
    const errors: string[] = []
    if (!enabledRoles.length) errors.push("ヒーローロール")
    if (!enabledRarities.length) errors.push("カードレアリティ")
    if (!enabledTypes.length) errors.push("カードタイプ")
    // require at least one of コラボ/通常 selected
    if (!heroCollab["コラボ"] && !heroCollab["通常"]) errors.push("コラボ/通常")
    if (errors.length) {
      setValidationErrors(errors)
      return
    }

    const chosenHero = heroPool.length ? pickRandom(heroPool) : allChars.length ? pickRandom(allChars) : undefined

    // enabledRarities and enabledTypes already computed above for validation
    const filteredCards = allCards.filter((c) => {
      const info = cardMap?.[c]
      if (!info) return true
      const rarityOk = enabledRarities.includes(info.rarity)
      const typeOk = enabledTypes.includes(info.type ?? "通常")
      return rarityOk && typeOk
    })

    const shuffledCards = shuffle([...filteredCards])
    const selected = shuffledCards.slice(0, Math.min(4, shuffledCards.length))

    let chosenStage: string | undefined
    if (includeStage) {
      const stagePool = allStages.filter((s) => (stageMap?.[s]?.member ?? teamMembers) === teamMembers)
      chosenStage = stagePool.length ? pickRandom(stagePool) : allStages.length ? pickRandom(allStages) : undefined
    }

    const result = { hero: chosenHero, cards: selected, stage: chosenStage }
    setLastResult(result)
    try {
      sessionStorage.setItem("compass-lastResult", JSON.stringify(result))
      sessionStorage.setItem("compass-roleFilters", JSON.stringify(roleFilters))
      sessionStorage.setItem("compass-rarityFilters", JSON.stringify(rarityFilters))
      sessionStorage.setItem("compass-typeFilters", JSON.stringify(typeFilters))
      sessionStorage.setItem("compass-includeStage", JSON.stringify(includeStage))
      sessionStorage.setItem("compass-teamMembers", JSON.stringify(teamMembers))
      sessionStorage.setItem("compass-heroCollab", JSON.stringify(heroCollab))
    } catch (e) {
      // ignore
    }
    router.push('/compass/result')
  }

  useEffect(() => {
    try {
      const rf = sessionStorage.getItem("compass-roleFilters")
      const raf = sessionStorage.getItem("compass-rarityFilters")
      const tf = sessionStorage.getItem("compass-typeFilters")
      const is = sessionStorage.getItem("compass-includeStage")
      const tm = sessionStorage.getItem("compass-teamMembers")
      if (rf) setRoleFilters(JSON.parse(rf))
      if (raf) setRarityFilters(JSON.parse(raf))
      if (tf) setTypeFilters(JSON.parse(tf))
      if (is) setIncludeStage(JSON.parse(is))
      if (tm) setTeamMembers(JSON.parse(tm))
      const hc = sessionStorage.getItem("compass-heroCollab")
      if (hc) {
        try {
          setHeroCollab(JSON.parse(hc))
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <main className="min-h-screen p-6 sm:p-8 max-w-4xl mx-auto bg-white text-black">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">コンパスルーレット</h1>
      <div className="p-4 border border-gray-200 rounded-md bg-gray-50 mb-4">
        <p>このルーレットは、非公式で作成されたものです。</p>
        <p>公式とは一切関係ありません。</p>
        <p>このルーレットは、条件を選択してランダムにヒーローやカード、ステージを選ぶことができます。</p>
        <p>以下の条件を選択してルーレットを回してください。</p>

        <p>「ヒーローロール」は必ず一つ以上選択してください。</p>
        <p>「コラボ/通常」は必ず一つ以上選択してください。</p>
        <p>「カードレアリティ」は必ず一つ以上選択してください。</p>
        <p>「カードタイプ」は必ず一つ以上選択してください。</p>

        <p className="mt-2 text-sm text-red-600">
          ※ 本ツールに使用されている名称・画像等の権利は、各権利者に帰属します。
        </p>
        <p className="mt-2 text-sm">
          ※ このルーレットは、2025年12月22日現在の最新情報を元に作成されています。
        </p>
      </div>

      <RouletteForm
        roleFilters={roleFilters}
        setRoleFilters={setRoleFilters}
        rarityFilters={rarityFilters}
        setRarityFilters={setRarityFilters}
        typeFilters={typeFilters}
        setTypeFilters={setTypeFilters}
        includeStage={includeStage}
        setIncludeStage={setIncludeStage}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        heroCollab={heroCollab}
        setHeroCollab={setHeroCollab}
      />

      <RouletteButtons onRoll={roll} />

      {validationErrors.length > 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setValidationErrors([])} />
          <div className="relative bg-white text-black rounded shadow-lg max-w-md w-full mx-4 p-4">
            <h3 className="text-lg font-semibold">条件を選択してください</h3>
            <div className="mt-4 text-right">
              <button aria-label="閉じる" className="text-gray-600" onClick={() => setValidationErrors([])}>×</button>
            </div>
            <div className="mt-2 text-sm">
              {validationErrors.map((s) => (
                <div key={s}>「{s}」は必ず一つ以上選択してください。</div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* 結果は /compass/result に表示するためここでは出力しない */}
    </main>
  )
}
