'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { fetchCategoryPaginated, type Article } from '@/utils/api';

const toPlainText = (html?: string) =>
  DOMPurify.sanitize(html || '', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

const truncate = (text: string, n: number) =>
  text.length > n ? text.slice(0, n - 1).trimEnd() + '…' : text;

export default function CategoryClient({
  category,
  language,
}: {
  category: string;
  language: string;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ARTICLES_PER_PAGE = 10;

  useEffect(() => {
    loadArticles(1);
  }, [category, language]);

  const loadArticles = async (pageNum: number) => {
    setLoading(true);
    try {
      const newArticles = await fetchCategoryPaginated(language, category, pageNum, ARTICLES_PER_PAGE);
      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => (pageNum === 1 ? newArticles : [...prev, ...newArticles]));
        setPage(pageNum);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {articles.length === 0 ? (
        <p>{loading ? 'Loading articles…' : 'No articles found.'}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => {
            const snippet = truncate(toPlainText(article.slug), 250);
            return (
              <div key={article.unique_id_url} className="pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  {article.image_path && (
                    <img
                      src={article.image_path}
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
            );
          })}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => loadArticles(page + 1)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Loading...' : `Show ${ARTICLES_PER_PAGE} more articles`}
          </button>
        </div>
      )}
    </>
  );
}
