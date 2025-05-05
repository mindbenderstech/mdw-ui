import React, { useEffect, useState } from 'react';
import { getAllArticles } from '../../utils/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  image_path: string;
  article_detail: string;
  byline_author: string;
}

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getAllArticles();
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  if (!articles.length) return <h2>No articles found.</h2>;

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="article">
          <h2>{article.title}</h2>
          <img alt={article.title} src={`http://localhost:5000/${article.image_path}`} />
          <h3>{article.byline_author}</h3>
          <p>{article.article_detail}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
