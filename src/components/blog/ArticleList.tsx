import { Condition } from '@/types/blog/condition';
import useArticle from '@/hooks/blog/useArticle';
import Link from 'next/link';
import styles from './ArticleList.module.css';

export default function ArticleList({ conditions }: { conditions: Condition }) {
  const { articles } = useArticle();
  return (
    <div className={styles['article-list-wrapper']}>
      {/* 記事一覧 */}
      <h2>- Article List -</h2>
      <div className={styles['article-list']}>
        {articles.map((article) => (
          article.tags.some((tag) =>
            /* タグ未指定 */
            (conditions.tags.length === 0 ||
            /* タグで絞る */
            conditions.tags.some(conditionTag => tag.includes(conditionTag))) &&
            /* キーワード未指定 */
            (conditions.keywords.length === 0 ||
            /* キーワードで絞る */
            conditions.keywords.some(keyword => article.title.includes(keyword)))
          ) && (
            <Link
              href={`/blog/${article.slug}`}
              key={article.slug}
            >
              <article key={article.slug} className={styles['article-card']}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className={styles['tag-list']}>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles['article-tag']}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}