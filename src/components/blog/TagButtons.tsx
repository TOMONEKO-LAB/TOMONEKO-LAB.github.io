import styles from './TagButtons.module.css';

export default function TagButtons({ tags, selectedTags, onTagClick }: { tags: string[]; selectedTags?: string[]; onTagClick: (tag: string) => void }) {
  return (
    <div className={styles['tag-buttons']}>
      {tags.map((tag) => {
        const isSelected = selectedTags ? selectedTags.includes(tag) : false;
        return (
          <button
            key={tag}
            className={styles['tag-button'] + (isSelected ? " " + styles.selected : "")}
            onClick={() => onTagClick(tag)}
            type="button"
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}