import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Function to fetch all articles
export const getAllArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/articles/all`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
};

export const getArticleById = async (unique_id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles/${unique_id}`, {
      cache: "no-store", // disables caching, important if data updates
    });

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    const data = await res.json();
    return data.article; // adjust if your API returns differently
  } catch (error) {
    console.error("Error fetching the article:", error);
    return null;
  }
};
