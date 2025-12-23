import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';
import 'katex/dist/katex.min.css';

import fs from 'fs';
import path from 'path';

export default function MarkdownWrapper({ filePath }: Readonly<{ filePath: string }>) {
  const fullPath = path.join(process.cwd(), `public/blog/${filePath}`);
  const markdown = fs.readFileSync(fullPath, 'utf-8');
  return (
    <div className="prose">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[rehypeKatex]}
      >
        {markdown}
      </Markdown>
    </div>);
}