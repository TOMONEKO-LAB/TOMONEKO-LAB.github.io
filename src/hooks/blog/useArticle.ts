"use client";

import { useEffect, useState } from "react";
import { Article } from "@/types/blog/article";

export default function useArticle() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data?.articles) setArticles(data.articles as Article[]);
      })
      .catch(() => {
        if (!mounted) return;
        setArticles([]);
      });
    return () => { mounted = false };
  }, []);

  return { articles };
}
