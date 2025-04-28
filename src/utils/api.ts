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
