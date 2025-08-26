import type { Metadata } from 'next';
import DOMPurify from 'isomorphic-dompurify';
import { notFound } from 'next/navigation';
import { fetchArticleByIdUrl, fetchAllArticles} from '@/utils/api';
import { toCdnUrl } from '@/utils/cdn';
import SwipeCarousel from '@/app/components/SwipeCarousel'; // client island is fine to import

type PageProps = { params: { language: string; unique_id_url: string } };

export const revalidate = 60; // Set ISR (incremental static regeneration)

const toPlainText = (html?: string) =>
  DOMPurify.sanitize(html || '', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

const truncate = (text: string, n: number) =>
  text.length > n ? text.slice(0, n - 1).trimEnd() + '…' : text;

const hasHtmlTags = (t: string) =>
  /<\s*(p|h1|h2|h3|h4|h5|h6|ul|ol|li|blockquote|strong|em|span|br|a|img)\b/i.test(t);

function renderArticleDetail(raw: string) {
  if (!raw) return null;
  if (hasHtmlTags(raw)) {
    const clean = DOMPurify.sanitize(raw, {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'span', 'a', 'ul', 'ol', 'li', 'blockquote', 'br', 'img'],
      ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class', 'id', 'src', 'alt'],
    });
    return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: clean }} />;
  }
  const colon = raw.indexOf(':');
  let formatted = raw;
  if (colon !== -1) formatted = `<strong>${raw.slice(0, colon + 1)}</strong>${raw.slice(colon + 1)}`;
  const parts = formatted.includes('\n\n') ? formatted.split(/\n{2,}/) : formatted.split(/(?<=[.!?])\s+/);
  const html = parts.map(s => s.trim()).filter(Boolean).map(s => `<p>${s}</p>`).join('');
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}

// SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, unique_id_url } = params;
  const article = await fetchArticleByIdUrl(language, unique_id_url);
  if (!article) return { title: 'Article not found - TheHeadlineWorld' };

  const desc = truncate(toPlainText(article.article_detail), 160);
  return {
    title: `${article.title} - TheHeadlineWorld`,
    description: desc,
    openGraph: {
      title: article.title,
      description: desc,
      url: `https://www.theheadlineworld.com/news/${language}/${article.unique_id_url}`,
      images: [{ url: toCdnUrl(article.image_path) || article.image_path }],
    },
    alternates: {
      canonical: `https://www.theheadlineworld.com/news/${language}/${article.unique_id_url}`,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { language, unique_id_url } = params;

  const article = await fetchArticleByIdUrl(language, unique_id_url);
  if (!article) return notFound();

  const allArticles = await fetchAllArticles(language);
  const trendingArticles = allArticles
    .filter(a => a.unique_id_url !== unique_id_url)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const categoryFrom = (url?: string | null) => {
    if (!url) return null;
    const m = url.match(/https?:\/\/[^/]+\/([^/]+)\//);
    return m ? m[1] : null;
  };
  const articleCategory = categoryFrom(article.news_source_url);
  const relatedArticles = allArticles
    .filter(a => a.unique_id_url !== unique_id_url && categoryFrom(a.news_source_url) === articleCategory)
    .slice(0, 3);

  return (
    <div className="flex gap-6 px-6 mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            image: toCdnUrl(article.image_path) || article.image_path,
            datePublished: article.article_date,
            author: { '@type': 'Person', name: article.byline_author },
            publisher: { '@type': 'Organization', name: 'TheHeadlineWorld', logo: { '@type': 'ImageObject', url: 'https://www.theheadlineworld.com/logo.png' } },
            url: `https://www.theheadlineworld.com/news/${language}/${article.unique_id_url}`,
          }),
        }}
      />

      {/* LEFT: Article */}
      <div className="w-full sm:w-[70%] space-y-4">
        <div className="max-w-5xl mx-auto mt-8 p-4 md:p-8 bg-white rounded-2xl shadow-md">
          <h1 className="md:text-2xl font-extrabold leading-snug mb-4 text-gray-900">{article.title}</h1>

          <div className="w-full overflow-hidden rounded-xl shadow">
            <img
              src={toCdnUrl(article.image_path) || article.image_path}
              alt={article.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={675}
              className="w-full object-cover max-h-[500px] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {article.byline_author && (
            <div className="text-l text-black mt-5 font-semibold">{article.byline_author}</div>
          )}

          <article className="mt-4 md:text-xl leading-relaxed text-gray-800">
            {renderArticleDetail(article.article_detail)}
          </article>
        </div>

        <h2 className="text-xl font-bold text-white mt-20 mb-2 p-1 rounded bg-blue-600">📚 Related News</h2>
        {/* Related Articles on Mobile as Swipeable */}
        <div className="sm:hidden">
          <SwipeCarousel articles={relatedArticles} language={language} slidesPerViewMobile={2} />
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {relatedArticles.map(r => (
            <a key={r.unique_id_url} href={`/news/${language}/${r.unique_id_url}`} className="block p-2 rounded hover:bg-gray-100 transition">
              <img
                src={toCdnUrl(r.image_path) || r.image_path}
                alt={r.title}
                loading="lazy"
                decoding="async"
                width={1200}
                height={675}
                className="w-full h-50 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-semibold text-gray-800">{r.title}</h3>
              <p className="text-xs text-gray-500">{r.article_date}</p>
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT: Trending */}
      <div className="w-full sm:w-[30%] space-y-4 sm:block hidden">
        <h2 className="text-xl font-bold text-white mt-20 mb-2 p-1 rounded bg-red-600">🔥 Trending News</h2>
        {trendingArticles.map(t => (
          <a key={t.unique_id_url} href={`/news/${language}/${t.unique_id_url}`} className="block p-2 rounded hover:bg-gray-100 transition">
            <img
              src={toCdnUrl(t.image_path) || t.image_path}
              alt={t.title}
              loading="lazy"
              decoding="async"
              width={320}
              height={180}
              className="w-full h-50 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800">{t.title}</h3>
            <p className="text-xs text-gray-500">{t.article_date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
