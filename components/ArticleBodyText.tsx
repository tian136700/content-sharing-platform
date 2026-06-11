function splitParagraphs(content: string): string[] {
  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/^\u3000+/, "").trim())
    .filter(Boolean);
}

interface ArticleBodyTextProps {
  content: string;
}

export default function ArticleBodyText({ content }: ArticleBodyTextProps) {
  const paragraphs = splitParagraphs(content);

  if (paragraphs.length === 0) return null;

  return (
    <div className="article-body space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
