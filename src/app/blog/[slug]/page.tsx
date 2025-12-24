import fs from "fs";
import path from "path";
import grayMatter from 'gray-matter';
import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import MarkdownWrapper from "@/components/blog/MarkdownWrapper";
import { notFound } from "next/navigation";
import { Article } from "@/types/blog/article";
import { Metadata } from "next";
import styles from '../BlogPage.module.css';

export const metadata: Metadata = {
  title: 'Blog | ',
  description: 'Read our latest blog articles on various topics.',
};

const getArticles = (): Article[] => {
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
    return articles;
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams(): Promise<{ slug: Article['slug'] }[]> {
  const articles = getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: { slug: Article['slug'] } }) {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find((article) => article.slug === slug);
  if (!article) {
    return notFound();
  }
  metadata.title = `Blog | ${article.title}`;
  metadata.description = article.description;
  return (
    <div className={styles.blogPage}>
      <Header />
      <MarkdownWrapper article={article} />
      <Footer />
    </div>
  );
}
