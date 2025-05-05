'use client';

import React, { useEffect, useState } from 'react';
import { getAllArticles } from '../../utils/api';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  news_source_url: string;
  unique_id: string;
  image_path: string;
  article_detail: string;
  article_date: string;
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
<div className="w-[65%] space-y-4 ml-6">
  <h2 className="text-2xl font-bold text-white mt-20 mb-10 p-1 rounded bg-indigo-700">Latest News</h2>
  <div className="flex gap-4">
    {/* Featured Article - Takes 50% of the left column */}
    <Link
      href={`/news/${latestArticle.unique_id}`}
      className="w-1/2 block group"
    >
      <img
        src={`http://localhost:5000/${latestArticle.image_path}`}
        alt={latestArticle.title}
        className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
        style={{ maxHeight: '400px' }}
      />
      <p className="text-sm text-gray-600 mb-2">{latestArticle.article_date}</p>
      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
        {latestArticle.title}
      </h2>
      <p className="text-md text-gray-500 italic">{latestArticle.slug}</p>
    </Link>

    {/* Next 5 Articles - Takes other 50% */}
    <div className="w-1/2 grid grid-cols-1 gap-4">
      {nextArticles.map((article) => (
        <Link
          key={article.id}
          href={`/news/${article.unique_id}`}
          className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
        >
          <img
            src={`http://localhost:5000/${article.image_path}`}
            alt={article.title}
            className="w-20 h-16 object-cover rounded"
          />
          <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
            {article.title}
          </h3>
        </Link>
      ))}
    </div>
  </div>
  <h2 className="text-2xl font-bold text-white mt-30 mb-10 p-1 rounded bg-indigo-700">Sports News</h2>
<div className="flex gap-4">
  {/* Featured Sports Article */}
  {articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0] && (
    <Link
      href={`/news/${articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0].unique_id}`}
      className="w-1/2 block group"
    >
      <img
        src={`http://localhost:5000/${articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0].image_path}`}
        alt={articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0].title}
        className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
        style={{ maxHeight: '400px' }}
      />
      <p className="text-sm text-gray-600 mb-2">{articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0].article_date}</p>
      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
        {articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0].title}
      </h2>
      <p className="text-md text-gray-500 italic">{articles.filter(a => a.news_source_url.toLowerCase().includes('sports'))[0].slug}</p>
    </Link>
  )}

  {/* Next Sports Articles */}
  <div className="w-1/2 grid grid-cols-1 gap-4">
    {articles
      .filter(a => a.news_source_url.toLowerCase().includes('sports'))
      .slice(1, 5)
      .map((article) => (
        <Link
          key={article.id}
          href={`/news/${article.unique_id}`}
          className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
        >
          <img
            src={`http://localhost:5000/${article.image_path}`}
            alt={article.title}
            className="w-20 h-16 object-cover rounded"
          />
          <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
            {article.title}
          </h3>
        </Link>
      ))}
  </div>
</div>
<h2 className="text-2xl font-bold text-white mt-30 mb-10 p-1 rounded bg-indigo-700">Crime News</h2>
<div className="flex gap-4">
  {/* Featured Sports Article */}
  {articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0] && (
    <Link
      href={`/news/${articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0].unique_id}`}
      className="w-1/2 block group"
    >
      <img
        src={`http://localhost:5000/${articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0].image_path}`}
        alt={articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0].title}
        className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
        style={{ maxHeight: '400px' }}
      />
      <p className="text-sm text-gray-600 mb-2">{articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0].article_date}</p>
      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
        {articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0].title}
      </h2>
      <p className="text-md text-gray-500 italic">{articles.filter(a => a.news_source_url.toLowerCase().includes('crime'))[0].slug}</p>
    </Link>
  )}

  {/* Next Sports Articles */}
  <div className="w-1/2 grid grid-cols-1 gap-4">
    {articles
      .filter(a => a.news_source_url.toLowerCase().includes('crime'))
      .slice(1, 5)
      .map((article) => (
        <Link
          key={article.id}
          href={`/news/${article.unique_id}`}
          className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
        >
          <img
            src={`http://localhost:5000/${article.image_path}`}
            alt={article.title}
            className="w-20 h-16 object-cover rounded"
          />
          <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
            {article.title}
          </h3>
        </Link>
      ))}
  </div>
</div>
  {/* Right Content - 30% width (blank) */}
  <div className="w-[30%]"></div>
</div>

  );
};

export default Home;
