import { searchArticles, fetchTrending, Article } from '@/utils/api';

// Utility: strip HTML tags
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
};

type SearchResultsProps = {
  params: Promise<{ language: string }>;
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchResultsPage({ params, searchParams }: SearchResultsProps) {
  const { language } = await params;
  const { query = '' } = await searchParams;

  let articles: Article[] = [];
  let trendingArticles: Article[] = [];

  if (query) {
    // ✅ Call backend search API instead of fetching all articles
    articles = await searchArticles(query, language);
  }

  // Always fetch trending articles
  trendingArticles = await fetchTrending(language, 5);

  return (
    <div className="flex flex-col sm:flex-row gap-6 px-6 mt-12">
      {/* LEFT: Search Results (70%) */}
      <div className="w-full sm:w-[70%] space-y-4">
        <h1 className="text-2xl font-bold mt-10 mb-6 p-1 rounded">Results for: {query}</h1>

        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {articles.map((article) => (
              <a
                key={article.unique_id_url}
                href={`/news/${language}/${article.unique_id_url}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Article image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={article.image_path}
                    alt={article.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{article.article_date}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {stripHtml(article.article_detail).slice(0, 120)}...
                  </p>
                  <span className="mt-3 inline-block text-blue-600 py-1 px-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white">
                    Read more →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Trending News (30%) */}
      <div className="w-full sm:w-[30%] space-y-4 sm:block hidden">
        <h2 className="text-xl font-bold text-white mt-10 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map((article) => (
          <a
            key={article.unique_id_url}
            href={`/news/${language}/${article.unique_id_url}`}
            className="block p-2 rounded hover:bg-gray-100 transition"
          >
            <img
              src={article.image_path}
              alt={article.title}
              loading="lazy"
              decoding="async"
              width={320}
              height={180}
              className="w-full h-50 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-500">{article.title}</h3>
            <p className="text-xs text-gray-500">{article.article_date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
