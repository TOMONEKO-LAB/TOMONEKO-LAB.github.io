import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';
import { Article } from "@/types/blog/article";
import styles from './MarkdownWrapper.module.css';
import 'katex/dist/katex.min.css';

export default function MarkdownWrapper({ article }: { article: Article }) {
  return (
    <main>
      <div className={"prose " + styles["markdown-wrapper"]}>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
          rehypePlugins={[rehypeKatex]}
        >
          {article.content}
        </Markdown>
      </div>
    </main>
  );
}