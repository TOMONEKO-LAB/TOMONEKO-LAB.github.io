import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

/*
type HeroInfo = {
	role?: string
	card?: Record<string, string>
	isCollab?: boolean
	[k: string]: unknown
}

type HeroData = Record<string, HeroInfo>

function normalize(v: unknown) {
	if (typeof v !== "string") return String(v || "").toLowerCase().replace(/\s+/g, "")
	return v.trim().toLowerCase().replace(/\s+/g, "")
}

function parseMulti(params: URLSearchParams, key: string) {
	const raw = params.getAll(key)
	const list = raw.flatMap((s) => (s ? s.split(",") : [])).map((s) => s.trim()).filter(Boolean)
	return list.length > 0 ? list : undefined
}

export async function GET(req: Request) {
 	// original implementation commented out; preserved here for reference
 	const url = new URL(req.url, "http://localhost")
 	const params = url.searchParams
 	const filters: Record<string, string | string[] | undefined> = {
 		role: parseMulti(params, "role") ?? params.get("role") ?? undefined,
 		isCollab: parseMulti(params, "isCollab") ?? params.get("isCollab") ?? undefined,
 	}

 	// also accept card_<slot>=<value> filters, e.g. card_近=速
 	for (const key of Array.from(params.keys())) {
 		if (key.startsWith("card_")) {
 			filters[key] = parseMulti(params, key) ?? params.get(key) ?? undefined
 		}
 	}

 	const p = path.join(process.cwd(), "public", "compass", "hero.json")
 	try {
 		const raw = fs.readFileSync(p, "utf8")
 		const data: HeroData = JSON.parse(raw)

 		const hasAny = Object.values(filters).some((v) => v !== undefined)
 		if (!hasAny) return NextResponse.json(data)

 		const result: HeroData = {}
 		for (const [name, info] of Object.entries(data)) {
 			let ok = true
 			for (const key of Object.keys(filters)) {
 				const val = filters[key]
 				if (!val) continue

 				if (key === "isCollab") {
 					const wanted = Array.isArray(val) ? val : [val]
 					const matched = wanted.some((w) => {
 						const want = normalize(w)
 						const actual = normalize(String(info.isCollab))
 						return actual === want || (want === "true" && actual === "true") || (want === "false" && actual === "false")
 					})
 					if (!matched) {
 						ok = false
 						break
 					}
 					continue
 				}

 				if (key.startsWith("card_")) {
 					const slot = key.slice("card_".length)
 					const field = info.card ? info.card[slot] : undefined
 					if (!field) {
 						ok = false
 						break
 					}
 					const wanted = Array.isArray(val) ? val : [val]
 					const matched = wanted.some((w) => normalize(field) === normalize(w))
 					if (!matched) {
 						ok = false
 						break
 					}
 					continue
 				}

 				// default: role
 				const field = info[key as keyof HeroInfo]
 				if (!field) {
 					ok = false
 					break
 				}
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
*/

export async function GET() {
 	const p = path.join(process.cwd(), "public", "compass", "hero.json")
 	try {
 		const raw = fs.readFileSync(p, "utf8")
 		const data = JSON.parse(raw)
 		return NextResponse.json(data)
 	} catch (e) {
 		return NextResponse.json({ error: "file not found" }, { status: 404 })
 	}
}
