import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ✅ NEW: Function to get supported languages
export const getLanguages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/languages`);
    return response.data.languages; // ["marathi", "hindi"]
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
};

// Fetch all articles by language
export const getAllArticles = async (language = 'marathi') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/articles/all`, {
      params: { language },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
};

// Fetch one article by unique_id_url and language
export const getArticleByUniqueIdUrl = async (unique_id_url: string, language = 'marathi') => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles/${unique_id_url}?language=${language}`, {
      cache: "no-store", // Avoid caching
    });

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    const data = await res.json();
    return data.article;
  } catch (error) {
    console.error("Error fetching the article:", error);
    return null;
  }
};
