import React, { useEffect, useState } from 'react';
import { getArticles, getAllArticles } from '../utils/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  image_path: string;
  article_detail: string;
  byline_author: string;
}

interface ArticleListProps {
  date: string; // Date prop for filtering by date
  showAll: boolean; // Show all articles if true, else show by date
}

const ArticleList: React.FC<ArticleListProps> = ({ date, showAll }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      let fetchedArticles;
      if (showAll) {
        // Fetch all articles if showAll is true
        fetchedArticles = await getAllArticles();
      } else {
        // Fetch articles for the specific date
        fetchedArticles = await getArticles(date);
      }
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, [date, showAll]); // Fetch whenever date or showAll changes

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
