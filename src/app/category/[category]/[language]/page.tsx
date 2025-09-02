// app/category/[category]/[language]/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import DOMPurify from 'isomorphic-dompurify';
import { fetchCategoryLatest, fetchTrending, type Article } from '@/utils/api';
import { toCdnUrl } from '@/utils/cdn';

type PageProps = {
  params: Promise<{ category: string; language: string }>;
};

export const revalidate = 60; // tune freshness (0 = always dynamic)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cap = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${cap} News - TheHeadlineWorld`,
    description: `Read the latest news and articles about ${cap} on TheHeadlineWorld. Stay updated on trending stories in the ${cap} category.`,
    openGraph: {
      title: `${cap} News - TheHeadlineWorld`,
      description: `Read the latest news and articles about ${cap} on TheHeadlineWorld.`,
      url: `https://www.theheadlineworld.com/${category}`,
      images: [{ url: 'https://www.theheadlineworld.com/logo.png' }],
    },
  };
}

const toPlainText = (html?: string) =>
  DOMPurify.sanitize(html || '', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

const truncate = (text: string, n: number) =>
  text.length > n ? text.slice(0, n - 1).trimEnd() + '…' : text;

export default async function CategoryPage({ params }: PageProps) {
  const { category, language } = await params;

  // ✅ Server-side fetch using new, efficient endpoints
  const [articles, trendingArticles]: [Article[], Article[]] = await Promise.all([
    fetchCategoryLatest(language, category, 24), // adjust limit if you want
    fetchTrending(language, 5),
  ]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 px-6 ">
      {/* JSON-LD (server-rendered) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${category.charAt(0).toUpperCase() + category.slice(1)} News - TheHeadlineWorld`,
            url: `https://www.theheadlineworld.com/${category}`,
            mainEntity: {
              '@type': 'NewsArticle',
              headline: `Latest ${category} News`,
              publisher: {
                '@type': 'Organization',
                name: 'TheHeadlineWorld',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.theheadlineworld.com/logo.png',
                },
              },
            },
          }),
        }}
      />

      {/* LEFT: Category Content (70%) */}
      <div className="w-full sm:w-[70%] space-y-4 mt-20">
        <h1 className="text-2xl font-bold mb-4 capitalize underline">{category} News</h1>

        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-6">
            {articles.map((article) => {
              const snippet = truncate(toPlainText(article.article_detail), 200);
              return (
                <div key={article.unique_id_url} className="pb-4">
                  <h2 className="sm:text-lg font-semibold mb-2 truncate">{article.title}</h2>
                  <div className="flex flex-col md:flex-row gap-4">
                    {article.image_path && (
                      <img
                        src={toCdnUrl(article.image_path) || article.image_path}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={180}
                        className="w-full md:w-1/2 max-h-60 object-cover rounded-lg shadow-md"
                      />
                    )}
                    <div className="flex flex-col justify-between md:w-1/2">
                      <p className="text-gray-700 mt-2 text-sm">{snippet}</p>
                      <p className="text-black text-xs">{article.article_date}</p>

                      <Link
                        href={`/news/${language}/${article.unique_id_url}`}
                        className="inline-block mt-4 text-white font-medium bg-indigo-800 px-4 py-2 rounded w-fit hover:bg-indigo-600"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT: Trending News (30%) */}
      <div className="w-full sm:w-[30%] space-y-4 mt-13 sm:block hidden">
        <h2 className="text-xl font-bold text-white mt-10 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map((article) => (
          <Link
            key={article.unique_id_url}
            href={`/news/${language}/${article.unique_id_url}`}
            className="block p-2 rounded hover:bg-gray-100 transition"
          >
            <img
              src={toCdnUrl(article.image_path) || article.image_path}
              alt={article.title}
              loading="lazy"
              decoding="async"
              width={320}
              height={180}
              className="w-full h-50 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 truncate">{article.title}</h3>
            <p className="text-xs text-gray-500">{article.article_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
