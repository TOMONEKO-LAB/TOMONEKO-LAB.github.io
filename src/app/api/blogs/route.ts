import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import { Article } from '@/types/blog/article';
import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  /* 記事一覧の取得 */
  const ArticlePath = path.join(process.cwd(), `/public/blog/`);
  try {
    const files = fs.readdirSync(ArticlePath);
    const articles: Article[] = files.map((file) => {
      const markdown = fs.readFileSync(path.join(ArticlePath, file), 'utf-8');
      const frontMatter = grayMatter(markdown);
      return {
        title: frontMatter.data.title,
        description: frontMatter.data.description,
        date: frontMatter.data.date,
        slug: frontMatter.data.slug,
        tags: frontMatter.data.tags || [],
        content: frontMatter.content,
      };
    });
    return new NextResponse(
      JSON.stringify({ articles }),
      {headers: { 'Content-Type': 'application/json' },}
    );
  } catch (error) {
    return NextResponse.json({ error: "file not found" }, { status: 404 })
  }
}