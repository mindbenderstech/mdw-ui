import { JSX } from "react/jsx-dev-runtime";
import { getArticleById } from "../../../utils/api"; // Adjust if needed

interface Article {
  id: number;
  title: string;
  image_path: string;
  article_detail: string;
  byline_author: string;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ unique_id: string }>;
}) {
  const { unique_id } = await params;
  const article: Article = await getArticleById(unique_id);

  function formatArticleDetail(rawText: string): JSX.Element {
    // Bold the text before the first colon
    const colonIndex = rawText.indexOf(':');
    let formatted = rawText;
    if (colonIndex !== -1) {
      const before = rawText.slice(0, colonIndex + 1);
      const after = rawText.slice(colonIndex + 1);
      formatted = `<strong>${before}</strong>${after}`;
    }
  
    // Paragraph break after every 5 periods
    const sentences = formatted.split('.');
    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += 5) {
      const group = sentences.slice(i, i + 9).join('.').trim();
      if (group) {
        paragraphs.push(`<p>${group}.</p>`);
      }
    }
  
    return <div dangerouslySetInnerHTML={{ __html: paragraphs.join('') }} className="space-y-4" />;
  }
  
  if (!article) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        Article not found.
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 md:p-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-4xl font-extrabold leading-snug mb-4 text-gray-900">{article.title}</h1>

      <div className="text-sm text-gray-600 mb-6">
        <span className="font-medium">By:</span> {article.byline_author}
      </div>

      <div className="w-full overflow-hidden rounded-xl shadow">
        <img
          src={`http://localhost:5000/${article.image_path}`}
          alt={article.title}
          className="w-full object-cover max-h-[500px] transition-transform duration-300 hover:scale-105"
        />
      </div>

      <article className="mt-6 text-lg leading-relaxed text-gray-800 whitespace-pre-line">
      {formatArticleDetail(article.article_detail)}
      </article>
    </div>
  );
}
