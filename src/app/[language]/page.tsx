// app/[language]/page.tsx (SERVER COMPONENT)
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchAllArticles, type Article } from '@/utils/api';
import { toCdnUrl } from '@/utils/cdn';
import SwipeCarousel from '@/app/components/SwipeCarousel';

type PageProps = {
  params: Promise<{ language: string }>;
};

export const revalidate = 60; // tune freshness as you like (0 = always dynamic)

// ✅ Replace <Head> with server-side metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language } = await params;  // Accessing language here
  return {
    title: 'The Headline World - Latest News, Articles, and More on Headlines',
    description:
      'The Headline World is your source for the latest headlines and articles across various categories including sports, crime, entertainment, and more.',
    openGraph: {
      title: 'The Headline World - Latest News and Articles on Headlines',
      description:
        'The Headline World is your source for the latest headlines and articles across various categories including sports, crime, entertainment, and more.',
      url: 'https://www.theheadlineworld.com',
      images: [{ url: 'https://www.theheadlineworld.com/logo.png' }],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { language } = await params;  // You are already getting 'language' here
  const articles: Article[] = await fetchAllArticles(language);

  if (!articles?.length) {
    return <h2 className="mt-20">No articles found.</h2>;
  }

  const latestArticle = articles[0];
  const nextArticles = articles.slice(1, 5);
  const getRandomArticles = (count: number) =>
    [...articles].sort(() => 0.5 - Math.random()).slice(0, count);
  const trendingArticles = getRandomArticles(5);

  const section = (title: string, keyword: string) => {
    const matched = articles.filter((a) => a.news_source_url?.toLowerCase().includes(keyword));
    if (!matched.length) return null;
    const [featured, ...rest] = matched;

    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-black underline p-1">{title}</h2>
        <div className="flex gap-4 sm:flex-row flex-col">
          <Link href={`/news/${language}/${featured.unique_id_url}`} className="w-full sm:w-1/2 block group mt-4">
            <img
              src={toCdnUrl(featured.image_path) || featured.image_path}
              alt={`Image related to ${featured.title}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={675}
              className="w-full h-auto object-cover rounded-lg mb-4 group-hover:scale-101 transition-transform"
              style={{ maxHeight: '400px' }}
            />
            <p className="text-sm text-gray-600 mb-2">{featured.article_date}</p>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">
              {featured.title}
            </h2>
            <p className="text-md text-gray-500 italic">{featured.slug}</p>
          </Link>

          {/* Mobile: keep your Swiper as a client island fed by server-fetched data */}
          <div className="w-full sm:hidden">
            <SwipeCarousel articles={rest.slice(0, 4)} language={language} slidesPerViewMobile={2} />
          </div>

          {/* Desktop list (unchanged) */}
          <div className="w-1/2 grid grid-cols-1 gap-4 hidden sm:grid">
            {rest.slice(0, 4).map((article) => (
              <Link
                key={article.id}
                href={`/news/${language}/${article.unique_id_url}`}
                className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                <img
                  src={toCdnUrl(article.image_path) || article.image_path}
                  alt={`Image related to ${article.title}`}
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={180}
                  className="w-35 h-20 mt-2 object-cover rounded"
                />
                <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 px-5 mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'The Headline World',
            alternateName: 'Headline World',
            logo: 'https://www.theheadlineworld.com/logo.png',
            url: 'https://www.theheadlineworld.com',
          }),
        }}
      />

      <div className="w-full sm:w-[70%] space-y-4 mt-10">
        <div className="flex gap-4 sm:flex-row flex-col">
          <Link href={`/news/${language}/${latestArticle.unique_id_url}`} className="w-full sm:w-1/2 block group mt-3">
            <img
              src={toCdnUrl(latestArticle.image_path) || latestArticle.image_path}
              alt={`Image related to ${latestArticle.title}`}
              loading="eager"
              width={1200}
              height={675}
              className="w-full h-auto object-cover rounded-lg group-hover:scale-101 transition-transform"
              style={{ maxHeight: '400px' }}
            />
            <p className="text-sm text-gray-600 mt-2 mb-2">{latestArticle.article_date}</p>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">{latestArticle.title}</h2>
            <p className="text-md text-gray-500 italic">{latestArticle.slug}</p>
          </Link>
          <div className="w-full sm:hidden">
            <SwipeCarousel articles={nextArticles} language={language} slidesPerViewMobile={2} />
          </div>
          <div className="w-1/2 grid grid-cols-1 gap-2 hidden sm:grid">
            {nextArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${language}/${article.unique_id_url}`}
                className="flex items-start gap-3 hover:bg-gray-100 p-2 rounded transition-colors"
              >
                <img
                  src={toCdnUrl(article.image_path) || article.image_path}
                  alt={`Image related to ${article.title}`}
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={180}
                  className="w-35 h-20 mt-2 object-cover rounded"
                />
                <h3 className="text-md font-semibold text-gray-800 hover:text-indigo-600">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        {section('Sports News', 'sports')}
        {section('Crime News', 'crime')}
        {section('Entertainment News', 'entertainment')}
      </div>

      <div className="w-full sm:w-[30%] space-y-2 md:block hidden">
        <h2 className="text-xl font-bold text-white mt-12 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${language}/${article.unique_id_url}`}
            className="block rounded hover:bg-gray-100 p-1 transition"
          >
            <img
              src={toCdnUrl(article.image_path) || article.image_path}
              alt={`Image related to ${article.title}`}
              loading="lazy"
              decoding="async"
              width={320}
              height={180}
              className="w-full h-50 mt-2 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-700">{article.title}</h3>
            <p className="text-xs text-gray-500">{article.article_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
