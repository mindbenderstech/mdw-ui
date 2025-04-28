'use client';

import React, { useEffect, useState } from 'react';
import { getAllArticles } from '../utils/api';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  image_path: string;
  article_detail: string;
  byline_author: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getAllArticles();
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  if (!articles.length) return <h2>No articles found.</h2>;

  const latestArticle = articles[0];
  const nextArticles = articles.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4">
      {/* Entire Blue Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-blue-500 rounded overflow-hidden">
        
        {/* Left side - Big article */}
        <Link
          href={`/news/${latestArticle.slug}`} // if you want clicking to open full article
          className="md:col-span-2 p-4 flex items-center space-x-4 group hover:bg-blue-600 transition-all duration-300 rounded"
        >
          {/* Image */}
          <img
            src={`http://localhost:5000/${latestArticle.image_path}`}
            alt={latestArticle.title}
            className="w-full h-auto object-contain rounded bg-white group-hover:scale-101 transition-transform duration-500"
            style={{ maxHeight: '350px' }}
          />

          {/* Title next to Image */}
          <div className="w-1/2">
            <h2 className="text-2xl font-bold leading-tight text-white hover:text-yellow-300 transition-colors duration-300">
              {latestArticle.title}
            </h2>
          </div>
        </Link>

        {/* Right side - 4 smaller articles */}
        <div className="p-4 flex flex-col space-y-4 text-white">
          {nextArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`} // make each article clickable
              className="border-b border-blue-400 pb-2 last:border-none hover:bg-blue-600 rounded-md transition-colors duration-300 p-2"
            >
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-yellow-300 transition-colors duration-300">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
