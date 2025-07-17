'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '../../../../context/LanguageContext';  // Import the context for language
import { API_BASE_URL } from '../../../../utils/api';
import Head from 'next/head'; // Import Head for SEO meta tags and structured data

type Article = {
    unique_id: string;
    unique_id_url: string;
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
    const params = useParams() as { category: string, language: string };  // ✅ access category and language from URL
    const { category } = params;

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const { language: currentLanguage } = useLanguage();

    useEffect(() => {
        async function fetchCategoryArticles() {
            try {
                setLoading(true)
                const res = await fetch(
                    `${API_BASE_URL}/api/articles/category/${category}?language=${currentLanguage}`
                );
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
    }, [category, currentLanguage]); // ✅ refetch when either category or language changes

    const getRandomArticles = (count: number) => {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const trendingArticles = getRandomArticles(5);

    return (
        <div className="flex flex-col sm:flex-row gap-6 px-6 ">
            <Head>
                {/* SEO Meta Tags */}
                <title>{category.charAt(0).toUpperCase() + category.slice(1)} News - TheHeadlineWorld</title>
                <meta
                    name="description"
                    content={`Read the latest news and articles about ${category} on TheHeadlineWorld. Stay updated on trending stories in the ${category} category.`}
                />
                <meta property="og:title" content={`${category.charAt(0).toUpperCase() + category.slice(1)} News - TheHeadlineWorld`} />
                <meta property="og:description" content={`Read the latest news and articles about ${category} on TheHeadlineWorld.`} />
                <meta property="og:url" content={`https://www.theheadlineworld.com/${category}`} />
                <meta property="og:image" content="https://www.theheadlineworld.com/logo.png" />

                {/* Structured Data (Schema for Category Page) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": `${category.charAt(0).toUpperCase() + category.slice(1)} News - TheHeadlineWorld`,
                        "url": `https://www.theheadlineworld.com/${category}`,
                        "mainEntity": {
                            "@type": "NewsArticle",
                            "headline": `Latest ${category} News`,
                            "publisher": {
                                "@type": "Organization",
                                "name": "TheHeadlineWorld",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://www.theheadlineworld.com/logo.png"
                                }
                            }
                        }
                    })}
                </script>
            </Head>

            {/* LEFT: Category Content (70%) */}
            <div className="w-full sm:w-[70%] space-y-4 mt-20">
                <h1 className="text-2xl font-bold mb-4 capitalize underline">{category} News</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : articles.length === 0 ? (
                    <p>No articles found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-6">
                        {articles.map((article) => (
                            <div key={article.unique_id_url} className="pb-4">
                                <h2 className="sm:text-lg font-semibold mb-2 truncate">{article.title}</h2>
                                <div className="flex flex-col md:flex-row gap-4">
                                    {article.image_path && (
                                        <img
                                            src={article.image_path}
                                            alt={`Image related to ${article.title}`}
                                            className="w-full md:w-1/2 max-h-60 object-cover rounded-lg shadow-md"
                                        />
                                    )}
                                    <div className="flex flex-col justify-between md:w-1/2">
                                        <p className="text-gray-700 mt-2 text-sm">{article.article_detail.slice(0, 200)}...</p>
                                        <p className="text-black text-xs">{article.article_date}</p>

                                        <a
                                            href={`/news/${currentLanguage}/${article.unique_id_url}`}
                                            className="inline-block mt-4 text-white font-medium bg-indigo-800 px-4 py-2 rounded w-fit hover:bg-indigo-600"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* RIGHT: Trending News (30%) */}
            <div className="w-full sm:w-[30%] space-y-4 mt-13 sm:block hidden">
                <h2 className="text-xl font-bold text-white mt-10 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
                {trendingArticles.map((article) => (
                    <a
                        key={article.unique_id_url}
                        href={`/news/${currentLanguage}/${article.unique_id_url}`}
                        className="block p-2 rounded hover:bg-gray-100 transition"
                    >
                        <img
                            src={article.image_path}
                            alt={`Trending news related to ${article.title}`}
                            className="w-full h-50 object-cover rounded mb-2"
                        />
                        <h3 className="text-sm font-semibold text-gray-800 truncate">{article.title}</h3>
                        <p className="text-xs text-gray-500">{article.article_date}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
