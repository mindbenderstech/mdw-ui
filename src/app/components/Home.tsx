'use client';

import React, { useEffect, useState } from 'react';
import { getAllArticles } from '../../utils/api';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext'; // ✅ Import context

interface Article {
  id: number;
  title: string;
  slug: string;
  news_source_url: string;
  unique_id: string;
  unique_id_url: string;
  image_path: string;
  article_detail: string;
  article_date: string;
  byline_author: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { language } = useLanguage(); // ✅ Use language from context

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getAllArticles(language); // ✅ Pass language
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, [language]); // ✅ Rerun when language changes

  if (!articles.length) return <h2 className='mt-20'>No articles found.</h2>;

  const latestArticle = articles[0];
  const nextArticles = articles.slice(1, 5);
  const getRandomArticles = (count: number) => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const trendingArticles = getRandomArticles(5);


  return (
    <div className="flex gap-2 px-5 mt-10">
      {/* LEFT: Main News Section (70%) */}
      <div className="w-[70%] space-y-4 mt-10">
        <div className="flex gap-4">
          {/* Featured Article */}
          <Link
            href={`/news/${language}/${latestArticle.unique_id_url}`}
            className="w-1/2 block group mt-3"
          >
            <img
              src={latestArticle.image_path}
              alt={latestArticle.title}
              className="w-full h-auto object-cover rounded-lg group-hover:scale-101 transition-transform"
              style={{ maxHeight: '400px' }}
            />
            <p className="text-sm text-gray-600 mt-2 mb-2">{latestArticle.article_date}</p>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
              {latestArticle.title}
            </h2>
            <p className="text-md text-gray-500 italic">{latestArticle.slug}</p>
          </Link>
  
          {/* Next Articles */}
          <div className="w-1/2 grid grid-cols-1 gap-2">
            {nextArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${language}/${article.unique_id_url}`}
                className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                <img
                  src={article.image_path}
                  alt={article.title}
                  className="w-35 h-20 mt-2 object-cover rounded"
                />
                <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
  
        {/* Sports News */}
        <h2 className="text-2xl font-bold text-black underline mt-10 p-1">Sports News</h2>
        <div className="flex gap-4">
          {articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0] && (
            <Link
              href={`/news/${language}/${articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0].unique_id_url}`}
              className="w-1/2 block group mt-4"
            >
              <img
                src={articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0].image_path}
                alt={articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0].title}
                className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
                style={{ maxHeight: '400px' }}
              />
              <p className="text-sm text-gray-600 mb-2">{articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0].article_date}</p>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
                {articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0].title}
              </h2>
              <p className="text-md text-gray-500 italic">{articles.filter(a => a.news_source_url?.toLowerCase().includes('sports'))[0].slug}</p>
            </Link>
          )}
  
          <div className="w-1/2 grid grid-cols-1 gap-4">
            {articles
              .filter(a => a.news_source_url?.toLowerCase().includes('sports'))
              .slice(1, 5)
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${language}/${article.unique_id_url}`}
                  className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  <img
                    src={article.image_path}
                    alt={article.title}
                    className="w-35 h-20 mt-2 object-cover rounded"
                  />
                  <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
                    {article.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
  
        {/* Crime News */}
        <h2 className="text-2xl font-bold text-black underline mt-10 p-1">Crime News</h2>
        <div className="flex gap-4">
          {articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0] && (
            <Link
              href={`/news/${language}/${articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0].unique_id_url}`}
              className="w-1/2 block group mt-4"
            >
              <img
                src={articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0].image_path}
                alt={articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0].title}
                className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
                style={{ maxHeight: '400px' }}
              />
              <p className="text-sm text-gray-600 mb-2">{articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0].article_date}</p>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
                {articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0].title}
              </h2>
              <p className="text-md text-gray-500 italic">{articles.filter(a => a.news_source_url?.toLowerCase().includes('crime'))[0].slug}</p>
            </Link>
          )}
  
          <div className="w-1/2 grid grid-cols-1 gap-4">
            {articles
              .filter(a => a.news_source_url?.toLowerCase().includes('crime'))
              .slice(1, 5)
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${language}/${article.unique_id_url}`}
                  className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  <img
                    src={article.image_path}
                    alt={article.title}
                    className="w-35 h-20 mt-2 object-cover rounded"
                  />
                  <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
                    {article.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>

        {/*Entertainment News */}
        <h2 className="text-2xl font-bold text-black underline mt-10 p-1">Entertainment News</h2>
        <div className="flex gap-4">
          {articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0] && (
            <Link
              href={`/news/${language}/${articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0].unique_id_url}`}
              className="w-1/2 block group mt-4"
            >
              <img
                src={articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0].image_path}
                alt={articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0].title}
                className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
                style={{ maxHeight: '400px' }}
              />
              <p className="text-sm text-gray-600 mb-2">{articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0].article_date}</p>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
                {articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0].title}
              </h2>
              <p className="text-md text-gray-500 italic">{articles.filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))[0].slug}</p>
            </Link>
          )}
  
          <div className="w-1/2 grid grid-cols-1 gap-4">
            {articles
              .filter(a => a.news_source_url?.toLowerCase().includes('entertainment'))
              .slice(1, 5)
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${language}/${article.unique_id_url}`}
                  className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  <img
                    src={article.image_path}
                    alt={article.title}
                    className="w-35 h-20 mt-2 object-cover rounded"
                  />
                  <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">
                    {article.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
  
      {/* RIGHT: Trending News Section */}
      <div className="w-[30%] space-y-2">
        <h2 className="text-xl font-bold text-white mt-12 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${language}/${article.unique_id_url}`}
            className="block rounded hover:bg-gray-100 p-1 transition"
          >
            <img
              src={article.image_path}
              alt={article.title}
              className="w-full h-50 mt-2 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-700">{article.title}</h3>
            <p className="text-xs text-gray-500">{article.article_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
  
};

export default Home;
