"use client";

import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import MarkdownWrapper from "@/components/blog/MarkdownWrapper";
import { useSearchParams } from "next/navigation";
import { Article } from "@/types/blog/article";
import styles from '../BlogPage.module.css';

export default function ArticlePage() {
  const searchParams = useSearchParams();
  const article :Article = {
    title: searchParams.get('title') || '',
    description: '',
    date: '',
    tags: searchParams.getAll('tags'),
    slug: '',
    content: searchParams.get('content') || '',
  };

  return (
    <div className={styles.blogPage}>
      <Header />
      <MarkdownWrapper article={article} />
      <Footer />
    </div>
  );
}
