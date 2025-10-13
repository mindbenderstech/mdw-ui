import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchTrending, fetchCategoryPage, type Article } from '@/utils/api';

type PageProps = {
  params: Promise<{ category: string; language: string }>;
  searchParams: Promise<{ page?: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cap = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${cap} News - TheHeadlineWorld`,
    description: `Read the latest ${cap} news and articles on TheHeadlineWorld.`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category, language } = await params;
  const { page = '1' } = await searchParams;

  const pageNum = Number(page) || 1;
  const [categoryData, trendingArticles] = await Promise.all([
    fetchCategoryPage(language, category, pageNum, 10), // 10 per page (change if needed)
    fetchTrending(language, 5),
  ]);

  const { articles, total, limit } = categoryData;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col sm:flex-row gap-6 px-6 ">
      {/* LEFT CONTENT */}
      <div className="w-full sm:w-[70%] mt-20">
        <h1 className="text-2xl font-bold mb-4 capitalize underline">{category} News</h1>

        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <div key={article.unique_id_url} className="pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  {article.image_path && (
                    <img
                      src={article.image_path}
                      alt={article.title}
                      loading="lazy"
                      width={320}
                      height={180}
                      className="w-full md:w-1/2 max-h-60 object-cover rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex flex-col justify-between md:w-1/2">
                    <p className="text-gray-700 mt-2 text-sm line-clamp-3">{article.slug}</p>
                    <p className="text-gray-500 text-xs">{article.article_date}</p>
                    <Link
                      href={`/news/${language}/${article.unique_id_url}`}
                      className="inline-block mt-4 text-white font-medium bg-indigo-800 px-4 py-2 rounded w-fit hover:bg-indigo-600"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ SMART PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 flex-wrap gap-2">
            {/* Previous Button */}
            {pageNum > 1 && (
              <Link
                href={`/category/${category}/${language}?page=${pageNum - 1}`}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Previous
              </Link>
            )}

            {/* Page Numbers with Ellipsis */}
            {(() => {
              const visiblePages: (number | string)[] = [];
              const delta = 2; // number of pages visible around current

              // Always show first page
              visiblePages.push(1);

              // Ellipsis after first page if needed
              if (pageNum - delta > 2) visiblePages.push('...');

              // Visible range around current
              for (
                let i = Math.max(2, pageNum - delta);
                i <= Math.min(totalPages - 1, pageNum + delta);
                i++
              ) {
                visiblePages.push(i);
              }

              // Ellipsis before last page if needed
              if (pageNum + delta < totalPages - 1) visiblePages.push('...');

              // Always show last page
              if (totalPages > 1) visiblePages.push(totalPages);

              return visiblePages.map((num, idx) =>
                num === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2">
                    ...
                  </span>
                ) : (
                  <Link
                    key={num}
                    href={`/category/${category}/${language}?page=${num}`}
                    className={`px-3 py-1 rounded ${
                      num === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </Link>
                )
              );
            })()}

            {/* Next Button */}
            {pageNum < totalPages && (
              <Link
                href={`/category/${category}/${language}?page=${pageNum + 1}`}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT — Trending */}
      <div className="w-full sm:w-[30%] space-y-4 mt-13 sm:block hidden">
        <h2 className="text-xl font-bold text-white mt-10 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map((article) => (
          <Link
            key={article.unique_id_url}
            href={`/news/${language}/${article.unique_id_url}`}
            className="block p-2 rounded hover:bg-gray-100 transition"
          >
            <img
              src={article.image_path}
              alt={article.title}
              loading="lazy"
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
