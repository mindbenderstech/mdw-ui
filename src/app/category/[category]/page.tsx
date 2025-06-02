'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Article = {
    unique_id: string;
    title: string;
    slug: string;
    image_path: string;
    byline_author: string;
    article_detail: string;
    article_date: string;
    article_date_and_time: string;
    created_at: string;
};

export default function CategoryPage() {
    const params = useParams() as { category: string };
    const category = params.category;
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    // Trending Articles Logic
    const getRandomArticles = (count: number) => {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    const trendingArticles = getRandomArticles(5);

    useEffect(() => {
        async function fetchCategoryArticles() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/category/${category}`);
                const data = await res.json();
                if (data.articles) {
                    setArticles(data.articles);
                }
            } catch (error) {
                console.error('Error fetching category articles:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategoryArticles();
    }, [category]);

    return (
        <div className="flex gap-6 px-6">
            {/* LEFT: Category Content (70%) */}
            <div className="w-[70%] mr-10 space-y-4 mt-20">
                <h1 className="text-2xl font-bold mb-4 capitalize underline">{category} News</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : articles.length === 0 ? (
                    <p>No articles found.</p>
                ) : (
                    <ul className="space-y-6">
                        {articles.map((article) => (
                            <li key={article.unique_id} className="pb-4">
                                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                <div className="flex flex-col md:flex-row gap-4">
                                    {article.image_path && (
                                        <img
                                            src={article.image_path}
                                            alt={article.title}
                                            className="w-full md:w-1/2 max-h-60 object-cover"
                                        />
                                    )}
                                    <div className="flex flex-col justify-between md:w-1/2">
                                        <p className="text-gray-700 mt-2">{article.article_detail.slice(0, 200)}...</p>
                                        <p className="text-black">{article.article_date}</p>
                                        
                                        <a
                                            href={`/news/${article.unique_id}`}
                                            className="inline-block mt-4 ml-45 text-white font-medium bg-indigo-800 px-4 py-2 rounded w-fit hover:bg-indigo-600"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* RIGHT: Trending News (30%) */}
            <div className="w-[30%] space-y-4 mt-13">
                <h2 className="text-xl font-bold text-white mt-10 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
                {trendingArticles.map((article) => (
                    <a
                        key={article.unique_id}
                        href={`/news/${article.unique_id}`}
                        className="block p-2 rounded hover:bg-gray-100 transition"
                    >
                        <img
                            src={article.image_path}
                            alt={article.title}
                            className="w-full h-50 object-cover rounded mb-2"
                        />
                        <h3 className="text-sm font-semibold text-gray-800">{article.title}</h3>
                        <p className="text-xs text-gray-500">{article.article_date}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
