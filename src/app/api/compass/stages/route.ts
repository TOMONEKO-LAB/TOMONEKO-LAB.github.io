import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

type StageInfo = {
	member?: number
	[k: string]: unknown
}

type StageData = Record<string, StageInfo>

function parseMulti(params: URLSearchParams, key: string) {
	const raw = params.getAll(key)
	const list = raw.flatMap((s) => (s ? s.split(",") : [])).map((s) => s.trim()).filter(Boolean)
	return list.length > 0 ? list : undefined
}

/*
export async function GET(req: Request) {
 	const url = new URL(req.url, "http://localhost")
 	const params = url.searchParams

 	const memberFilter = parseMulti(params, "member") ?? params.get("member") ?? undefined

 	const p = path.join(process.cwd(), "public", "compass", "stage.json")
 	try {
 		const raw = fs.readFileSync(p, "utf8")
 		const data: StageData = JSON.parse(raw)

 		if (!memberFilter) return NextResponse.json(data)

 		const wanted = Array.isArray(memberFilter) ? memberFilter.map((v) => Number(v)) : [Number(memberFilter)]

 		const result: StageData = {}
 		for (const [name, info] of Object.entries(data)) {
 			const m = Number(info.member)
 			if (wanted.some((w) => Number.isFinite(w) && w === m)) result[name] = info
 		}

 		return NextResponse.json(result)
 	} catch (e) {
 		return NextResponse.json({ error: "file not found" }, { status: 404 })
 	}
}
*/

export async function GET() {
 	const p = path.join(process.cwd(), "public", "compass", "stage.json")
 	try {
 		const raw = fs.readFileSync(p, "utf8")
 		const data = JSON.parse(raw)
 		return NextResponse.json(data)
 	} catch (e) {
 		return NextResponse.json({ error: "file not found" }, { status: 404 })
 	}
}
