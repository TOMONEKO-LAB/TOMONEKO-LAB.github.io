import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import MarkdownWrapper from "@/components/blog/MarkdownWrapper";
import { Article } from "@/types/blog/article";
import styles from '../BlogPage.module.css';

export default async function ArticlePage({
  searchParams
}: { searchParams: {
    title?: string;
    content?: string;
    tags?: string | string[];
  };
}) {
  const params = await searchParams;
  const article :Article = {
    title: params.title || '',
    description: '',
    date: '',
    tags: Array.isArray(params.tags) ? params.tags : params.tags ? [params.tags] : [],
    slug: '',
    content: params.content || '',
  };

  return (
    <div className={styles.blogPage}>
      <Header />
      <MarkdownWrapper article={article} />
      <Footer />
    </div>
  );
}
