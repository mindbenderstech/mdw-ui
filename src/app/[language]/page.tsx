// app/[language]/page.tsx (SERVER COMPONENT)
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchLatest, fetchCategoryLatest, fetchTrending, type Article } from '@/utils/api';
import { toCdnUrl } from '@/utils/cdn';
import SwipeCarousel from '@/app/components/SwipeCarousel';

type PageProps = {
  params: Promise<{ language: string }>;
};

export const revalidate = 60;

// Map your language segments to hreflang & path
const LANG_MAP: Record<string, { hreflang: string; path: string }> = {
  hindi:   { hreflang: 'hi', path: 'hindi' },
  english: { hreflang: 'en', path: 'english' },
  marathi: { hreflang: 'mr', path: 'marathi' },
  kannada: { hreflang: 'kn', path: 'kannada' },
};

const SITE = {
  brand: 'The Headline World',
  url: 'https://www.theheadlineworld.com',
  logo: 'https://www.theheadlineworld.com/logo.png',
  tag: 'Fast, clear, credible news',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language } = await params;
  const lang = LANG_MAP[language]?.hreflang ?? 'hi';

  const metadataBase = new URL(SITE.url);
  const canonical = LANG_MAP[language]
    ? `${SITE.url}/${LANG_MAP[language].path}`
    : SITE.url;

  const languageAlternates: Record<string, string> = {
    'x-default': SITE.url, // helpful fallback
  };
  Object.values(LANG_MAP).forEach((v) => {
    languageAlternates[v.hreflang] = `${SITE.url}/${v.path}`;
  });

  const title = `${SITE.brand} — ${SITE.tag}`;
  const description = `${SITE.brand} is your source for the latest headlines and articles across categories including sports, crime, entertainment, and more.`;

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.brand,
      images: [{ url: SITE.logo }],
      type: 'website',
      // If you prefer BCP-47-like OG locale, you can use 'en_US', 'hi_IN', etc.
      locale: lang,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE.logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    // verification: { google: 'YOUR_GSC_VERIFICATION_CODE' },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { language } = await params;  // You are already getting 'language' here

  // Fetch only what's needed, in parallel
  const [latest, sports, crime, entertainment, trendingArticles] = await Promise.all([
    fetchLatest(language, 5),
    fetchCategoryLatest(language, 'sports', 5),
    fetchCategoryLatest(language, 'crime', 5),
    fetchCategoryLatest(language, 'entertainment', 5),
    fetchTrending(language, 5),
  ]);

  if (!latest?.length) {
    return <h2 className="mt-20">No articles found.</h2>;
  }

  const latestArticle = latest[0];
  const nextArticles = latest.slice(1, 5);

  const section = (title: string, items: Article[]) => {
    if (!items?.length) return null;
    const [featured, ...rest] = items;

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

          {/* Desktop list */}
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
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE.brand,
              alternateName: ['TheHeadlineWorld', 'Headline World'],
              logo: SITE.logo,
              url: SITE.url,
              sameAs: [
                // 'https://www.facebook.com/yourpage',
                // 'https://twitter.com/yourhandle',
                // 'https://www.instagram.com/yourhandle',
                // 'https://www.youtube.com/@yourchannel'
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE.brand,
              alternateName: ['TheHeadlineWorld', 'Headline World'],
              url: SITE.url,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
          ]),
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

        {section('Sports News', sports)}
        {section('Crime News', crime)}
        {section('Entertainment News', entertainment)}
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
