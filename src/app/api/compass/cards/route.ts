import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

type CardInfo = {
	attribute?: string
	rarity?: string
	skill?: string
	type?: string
	rank?: string
	[k: string]: unknown
}

type CardData = Record<string, CardInfo>

type Filters = Partial<{
	attribute: string | string[]
	rarity: string | string[]
	skill: string | string[]
	type: string | string[]
	rank: string | string[]
}>

function normalize(v: unknown) {
	if (typeof v !== "string") return String(v || "").toLowerCase().replace(/\s+/g, "")
	return v.trim().toLowerCase().replace(/\s+/g, "")
}

export async function GET(req: Request) {
	const url = new URL(req.url, "http://localhost")
	const params = url.searchParams
	// support repeated params or comma-separated values for all filter keys
	function parseMulti(key: string) {
		const raw = params.getAll(key)
		const list = raw.flatMap((s) => (s ? s.split(",") : [])).map((s) => s.trim()).filter(Boolean)
		return list.length > 0 ? list : undefined
	}

	const filters: Filters = {
		attribute: parseMulti("attribute") ?? params.get("attribute") ?? undefined,
		rarity: parseMulti("rarity") ?? params.get("rarity") ?? undefined,
		skill: parseMulti("skill") ?? params.get("skill") ?? undefined,
		type: parseMulti("type") ?? params.get("type") ?? undefined,
		rank: parseMulti("rank") ?? params.get("rank") ?? undefined,
	}

	const p = path.join(process.cwd(), "public", "compass", "card.json")
	try {
		const raw = fs.readFileSync(p, "utf8")
		const data: CardData = JSON.parse(raw)

		const hasAnyFilter = Object.values(filters).some((v) => v !== undefined)
		if (!hasAnyFilter) return NextResponse.json(data)

		const result: CardData = {}
		for (const [name, info] of Object.entries(data)) {
			let ok = true
			for (const key of Object.keys(filters) as Array<keyof Filters>) {
				const val = filters[key]
				if (!val) continue
				const field = info[key as keyof CardInfo]
				if (!field) {
					ok = false
					break
				}
				// allow multiple values for any filter: treat array as OR among values
				const wanted = Array.isArray(val) ? val : [val]
				const matched = wanted.some((w) => normalize(field) === normalize(w))
				if (!matched) {
					ok = false
					break
				}
			}
			if (ok) result[name] = info
		}

		return NextResponse.json(result)
	} catch (e) {
		return NextResponse.json({ error: "file not found" }, { status: 404 })
	}
}
