'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticleById } from '../../utils/api';

interface Article {
  id: number;
  title: string;
  image_path: string;
  article_detail: string;
  byline_author: string;
}

const ArticleDetail: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const router = useRouter();
  const { unique_id } = router.query;

  useEffect(() => {
    if (unique_id) {
      const fetchArticle = async () => {
        const fetchedArticle = await getArticleById(unique_id as string);
        setArticle(fetchedArticle);
      };
      fetchArticle();
    }
  }, [unique_id]);

  if (!article) return <h2>Loading...</h2>;

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4">
      <div className="article-detail">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <h3 className="text-lg">{article.byline_author}</h3>
        <img src={`http://localhost:5000/${article.image_path}`} alt={article.title} />
        <p>{article.article_detail}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
