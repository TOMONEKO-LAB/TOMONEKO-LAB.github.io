import { Condition } from "@/types/blog/condition";
import TagButtons from "@/components/blog/TagButtons";
import useArticle from "@/hooks/blog/useArticle";
import styles from './SearchForm.module.css';

export default function SearchForm({ conditions, setConditions }: { conditions: Condition; setConditions: (c: Condition) => void }) {
  /* 記事一覧の取得 */
  const { articles } = useArticle();
  /* 記事一覧からタグを取得 */
  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags)));
  return (
    <div className={styles['search-form']}>
      {/* 検索用語で絞る */}
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search Articles..."
        value={conditions.keywords.join(" ")}
        onChange={(e) => setConditions({ ...conditions, keywords: e.target.value.split(" ") })}
      />
      {/* 検索タグで絞る */}
      <TagButtons
        tags={allTags}
        selectedTags={conditions.tags}
        onTagClick={(tag) =>
          setConditions({
            ...conditions,
            tags: conditions.tags.includes(tag) ? conditions.tags.filter((t) => t !== tag) : [...conditions.tags, tag],
          })
        }
      />
    </div>
  );
}