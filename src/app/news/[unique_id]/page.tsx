import { JSX } from "react/jsx-dev-runtime";
import { getArticleById, getAllArticles } from "../../../utils/api"; // Adjust if needed

interface Article {
  id: number;
  unique_id: string;
  title: string;
  image_path: string;
  news_source_url: string;
  article_detail: string;
  byline_author: string;
  article_date: string;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ unique_id: string }>;
}) {
  const { unique_id } = await params;
  const article: Article = await getArticleById(unique_id);

  // Fetch all articles for trending logic
  const allArticles: Article[] = await getAllArticles();

  // Trending Articles Logic: Get 5 random articles
  const getRandomArticles = (articles: Article[], count: number) => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get 5 random articles (excluding the current article)
  const trendingArticles = getRandomArticles(
    allArticles.filter((a) => a.unique_id !== unique_id),
    5
  );

  // Function to extract the category from the news_source_url
  const extractCategoryFromUrl = (url: string) => {
    const categoryMatch = url.match(/https?:\/\/[^/]+\/([^/]+)\//); // Extract the first part after the domain
    return categoryMatch ? categoryMatch[1] : null;
  };

  // Extract the category from the current article's news_source_url
  const articleCategory = extractCategoryFromUrl(article.news_source_url);

  // Fetch related articles based on category/topic (not exact URL match)
  const relatedArticles = allArticles
    .filter(
      (a) =>
        extractCategoryFromUrl(a.news_source_url) === articleCategory &&
        a.unique_id !== unique_id
    )
    .slice(0, 3); // Limit to 3 related articles

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
      const group = sentences.slice(i, i + 5).join('.').trim();
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
    <div className="flex gap-6 px-6 mt-10">
      {/* LEFT: Article Content (70%) */}
      <div className="w-[70%] space-y-4">
        <div className="max-w-5xl mx-auto mt-8 p-4 md:p-8 bg-white rounded-2xl shadow-md">
          <h1 className="text-4xl font-extrabold leading-snug mb-4 text-gray-900">{article.title}</h1>

          <div className="text-l text-black mb-6">
            <span className="font-medium"></span> {article.byline_author}
          </div>

          <div className="w-full overflow-hidden rounded-xl shadow">
            <img
              src={article.image_path}
              alt={article.title}
              className="w-full object-cover max-h-[500px] transition-transform duration-300 hover:scale-105"
            />
          </div>

          <article className="mt-6 text-lg leading-relaxed text-gray-800 whitespace-pre-line">
            {formatArticleDetail(article.article_detail)}
          </article>
        </div>

        {/* RELATED ARTICLES */}
        <h2 className="text-xl font-bold text-white mt-20 mb-2 p-1 rounded bg-blue-600">📚 Related News</h2>
        <div className="grid grid-cols-3 gap-4"> {/* This will display related articles side by side */}
          {relatedArticles.map((article) => (
            <a
              key={article.id}
              href={`/news/${article.unique_id}`}
              className="block p-2 rounded hover:bg-gray-100 transition"
            >
              <img
                src={article.image_path}
                alt={article.title}
                className="w-full h-50 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-semibold text-gray-800">{article.title}</h3>
              <p className="text-xs text-gray-500">{article.article_date}</p>
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT: Trending News (30%) */}
      <div className="w-[30%] space-y-4">
        <h2 className="text-xl font-bold text-white mt-20 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map((article) => (
          <a
            key={article.id}
            href={`/news/${article.unique_id}`}
            className="block p-2 rounded hover:bg-gray-100 transition"
          >
            <img
              src={article.image_path}
              alt={article.title}
              className="w-full h-50 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800">{article.title}</h3>
            <p className="text-xs text-gray-500">{article.article_date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
