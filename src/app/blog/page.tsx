"use client"

import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import ArticleList from "@/components/blog/ArticleList";
import SearchForm from "@/components/blog/SearchForm";
import { Condition } from "@/types/blog/condition";
import { useState } from "react";
import styles from './BlogPage.module.css';

export default function BlogPage() {
  const [conditions, setConditions] = useState<Condition>({ keywords: [], tags: [] });
  return (
    <div className={styles.blogPage}>
      <Header />
      <main>
        <SearchForm conditions={conditions} setConditions={setConditions} />
        <ArticleList conditions={conditions} />
      </main>
      <Footer />
    </div>
  );
};
