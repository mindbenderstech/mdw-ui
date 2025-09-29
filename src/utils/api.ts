// utils/api.ts
export type Article = {
  id: number;
  unique_id: string;
  unique_id_url: string;
  title: string;
  slug: string;
  news_source_url: string;
  image_path: string;
  byline_author: string;
  article_detail: string;
  article_date: string;
  created_at?: string | null;
  article_date_and_time?: string | null;
};

const RAW_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "";

export const API_BASE_URL = RAW_BASE.trim().replace(/\/+$/, '');

// 2) Build URLs safely
function makeUrl(path: string, params?: Record<string, string>) {
  const cleanPath = path.replace(/^\/+/, '');
  // If no base URL is configured, build a relative URL
  if (!API_BASE_URL) {
    const qs = params ? `?${new URLSearchParams(params).toString()}` : '';
    return `/${cleanPath}${qs}`;
  }
  // Otherwise, build absolute URL against the API base
  const u = new URL(cleanPath, API_BASE_URL + '/');
  if (params) {
    for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  }
  return u.toString();
}

// 3) Common JSON fetcher
// IMPORTANT: do NOT force 'no-store' here, so next.revalidate can work.
async function getJson<T>(
  url: string,
  init?: RequestInit & { next?: { revalidate?: number } }
): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Fetch ${res.status}: ${url}`);
  return res.json();
}

export const getLanguages = async () => {
  const url = `${API_BASE_URL}/api/languages`;
  const data = await getJson<{ languages: string[] }>(url);
  return data.languages || [];
};

// 4) Fetchers — always use makeUrl/API_BASE_URL (never process.env directly)
export async function fetchAllArticles(language: string): Promise<Article[]> {
  const url = makeUrl('api/articles/all', { language });
  const data = await getJson<{ articles: Article[] }>(url);
  return data.articles ?? [];
}

export async function fetchArticleByIdUrl(language: string, uniqueIdUrl: string): Promise<Article | null> {
  const url = makeUrl(`api/articles/${encodeURIComponent(uniqueIdUrl)}`, { language });
  const data = await getJson<{ article: Article | null }>(url);
  return data.article ?? null;
}

export async function fetchCategoryArticles(language: string, category: string): Promise<Article[]> {
  const url = makeUrl(`api/articles/category/${encodeURIComponent(category)}`, { language });
  const data = await getJson<{ articles: Article[] }>(url);
  return data.articles ?? [];
}

export async function fetchLanguages(): Promise<string[]> {
  const url = makeUrl('api/languages');
  const data = await getJson<{ languages: string[] }>(url, { cache: 'force-cache' });
  return data.languages ?? [];
}

export async function fetchLatest(language: string, limit = 6, offset = 0) {
  const url = makeUrl('api/articles/latest', { language, limit: String(limit), offset: String(offset) });
  return getJson<{ articles: Article[] }>(url, { next: { revalidate: 60 } }).then(d => d.articles ?? []);
}

export async function fetchCategoryLatest(language: string, category: string, limit = 8) {
  const url = makeUrl(`api/articles/category/${encodeURIComponent(category)}/latest`, { language, limit: String(limit) });
  return getJson<{ articles: Article[] }>(url, { next: { revalidate: 120 } }).then(d => d.articles ?? []);
}

export async function fetchTrending(language: string, pick = 5) {
  const url = makeUrl('api/articles/trending', { language, pick: String(pick) });
  return getJson<{ articles: Article[] }>(url, { next: { revalidate: 60 } }).then(d => d.articles ?? []);
}

export async function searchArticles(query: string, language: string): Promise<Article[]> {
  const url = makeUrl('api/articles/search', { query, language });
  const data = await getJson<{ articles: Article[] }>(url);
  return data.articles ?? [];
}