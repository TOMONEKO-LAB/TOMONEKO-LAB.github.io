import Header from "@/components/blog/Header";
import Footer from "@/components/blog/Footer";
import MarkdownWrapper from "@/components/blog/MarkdownWrapper";
import { Article } from "@/types/blog/article";
import styles from '../BlogPage.module.css';

export default function ArticlePage({
  searchParams
}: { searchParams: {
    title?: string;
    content?: string;
    tags?: string | string[];
  };
}) {
  const article :Article = {
    title: searchParams.title || '',
    description: '',
    date: '',
    tags: Array.isArray(searchParams.tags) ? searchParams.tags : searchParams.tags ? [searchParams.tags] : [],
    slug: '',
    content: searchParams.content || '',
  };

  return (
    <div className={styles.blogPage}>
      <Header />
      <MarkdownWrapper article={article} />
      <Footer />
    </div>
  );
}
