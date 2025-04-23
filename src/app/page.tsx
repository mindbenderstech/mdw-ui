'use client';
import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';

const Home = () => {
  const [date, setDate] = useState('2025-04-21'); 
  const [showAll, setShowAll] = useState(false);

  // Handle toggle between "All Articles" and "Articles by Date"
  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  useEffect(() => {
    console.log('Selected date:', date);
  }, [date]);

  return (
    <div>
      <h1>News Articles</h1>
      {/* Button to toggle between showing all news and news by date */}
      <button onClick={handleToggle}>
        {showAll ? 'Show Articles by Date' : 'Show All News'}
      </button>

      {/* If not showing all, show the date input */}
      {!showAll && (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      )}

      {/* Pass showAll state and date to ArticleList */}
      <ArticleList date={date} showAll={showAll} />
    </div>
  );
};

export default Home;
