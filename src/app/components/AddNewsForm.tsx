'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type FormState = {
  title: string;
  slug: string;
  news_source_url: string;
  byline_author: string;
  article_detail: string;
  article_date: string;
  language: 'hindi' | 'marathi' | 'english' | 'kannada';
};

const MAX_TITLE = 120;
const MAX_SLUG = 140;
const MAX_DETAIL = 20_000;
const MAX_IMAGE_MB = 5;

const languages = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'marathi', label: 'Marathi' },
  { value: 'english', label: 'English' },
  { value: 'kannada', label: 'Kannada' },
];

function generateSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\u0900-\u097F]/g, '') // strip Devanagari if present
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Read the admin JWT saved by AdminLogin
function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

const AddNewsForm = () => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [formData, setFormData] = useState<FormState>({
    title: '',
    slug: '',
    news_source_url: '',
    byline_author: '',
    article_detail: '',
    article_date: today,
    language: 'hindi',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [touchedSlugManually, setTouchedSlugManually] = useState(false);

  const dropRef = useRef<HTMLDivElement | null>(null);

  // Auto-generate slug until user edits slug manually
  useEffect(() => {
    if (!touchedSlugManually) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title).slice(0, MAX_SLUG) }));
    }
  }, [formData.title, touchedSlugManually]);

  // Image preview cleanup
  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Length caps
    if (name === 'title' && value.length > MAX_TITLE) return;
    if (name === 'slug' && value.length > MAX_SLUG) return;
    if (name === 'article_detail' && value.length > MAX_DETAIL) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouchedSlugManually(true);
    handleChange(e);
  };

  const validateAndSetImage = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isUnderLimit = file.size / (1024 * 1024) <= MAX_IMAGE_MB;
    if (!isImage) {
      showToast('error', 'Please select an image file (jpg, png, webp, etc.)');
      return;
    }
    if (!isUnderLimit) {
      showToast('error', `Image must be ≤ ${MAX_IMAGE_MB} MB`);
      return;
    }
    setImageFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetImage(e.target.files[0]);
    }
  };

  // Drag & drop (typed to Event to avoid TS overload errors)
  useEffect(() => {
    const el = dropRef.current as HTMLDivElement | null;
    if (!el) return;

    const prevent = (ev: Event) => {
      ev.preventDefault();
      ev.stopPropagation();
    };

    const onDragOver = (ev: Event) => prevent(ev);
    const onDragLeave = (ev: Event) => prevent(ev);

    const onDrop = (ev: Event) => {
      prevent(ev);
      const drag = ev as DragEvent;
      const file = drag.dataTransfer?.files?.[0];
      if (file) validateAndSetImage(file);
    };

    (['dragenter', 'dragover', 'dragleave', 'drop'] as const).forEach((type) => {
      const handler: EventListener =
        type === 'drop' ? onDrop : type === 'dragover' ? onDragOver : onDragLeave;
      el.addEventListener(type, handler);
    });

    return () => {
      (['dragenter', 'dragover', 'dragleave', 'drop'] as const).forEach((type) => {
        const handler: EventListener =
          type === 'drop' ? onDrop : type === 'dragover' ? onDragOver : onDragLeave;
        el.removeEventListener(type, handler);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // ✅ Require auth
      const token = getAdminToken();
      if (!token) {
        showToast('error', 'Please log in to submit.');
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/articles/submit`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`, // ✅ include JWT
          },
          body: formDataToSend,
        }
      );

      // If token expired/invalid, bounce to login
      if (res.status === 401) {
        showToast('error', 'Session expired. Please log in again.');
        localStorage.removeItem('admin_token');
        setTimeout(() => window.location.reload(), 800);
        return;
      }

      const result = await res.json();

      if (res.ok) {
        showToast('success', `Submitted: ${result.article?.title ?? 'Article'}`);
        // Reset
        setFormData({
          title: '',
          slug: '',
          news_source_url: '',
          byline_author: '',
          article_detail: '',
          article_date: today,
          language: 'hindi',
        });
        setTouchedSlugManually(false);
        setImageFile(null);
      } else {
        showToast('error', result.error || 'Failed to submit article.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-3 shadow-lg text-sm ${
            toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Article</h2>
          <span className="text-xs text-gray-500">All fields marked * are required</span>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter headline"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <div className="mt-1 text-right text-xs text-gray-500">
            {formData.title.length}/{MAX_TITLE}
          </div>
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium">
            Slug *
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="auto-generated from title (you can edit)"
            value={formData.slug}
            onChange={handleSlugChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <div className="mt-1 text-right text-xs text-gray-500">
            {formData.slug.length}/{MAX_SLUG}
          </div>
        </div>

        {/* Source URL + Byline (grid) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="news_source_url" className="mb-1 block text-sm font-medium">
              News Source URL *
            </label>
            <input
              id="news_source_url"
              name="news_source_url"
              type="url"
              placeholder="https://example.com/article"
              value={formData.news_source_url}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <p className="mt-1 text-xs text-gray-500">Used to derive a unique permalink.</p>
          </div>

          <div>
            <label htmlFor="byline_author" className="mb-1 block text-sm font-medium">
              Byline Author *
            </label>
            <input
              id="byline_author"
              name="byline_author"
              type="text"
              placeholder="Enter author name"
              value={formData.byline_author}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Image uploader */}
        <div>
          <label className="mb-1 block text-sm font-medium">Lead Image (optional)</label>

          <div
            ref={dropRef}
            className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:bg-gray-100"
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Upload image"
            />
            <div className="pointer-events-none">
              <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-700">
                Drag & drop or <span className="font-medium underline">browse</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP • up to {MAX_IMAGE_MB}MB</p>
            </div>
          </div>

          {imageFile && (
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-16 w-16 rounded-md object-cover ring-1 ring-gray-200"
                />
              )}
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{imageFile.name}</div>
                <div className="text-xs text-gray-500">
                  {(imageFile.size / (1024 * 1024)).toFixed(2)} MB • {imageFile.type || 'image'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImageFile(null)}
                className="ml-auto rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Article detail */}
        <div>
          <label htmlFor="article_detail" className="mb-1 block text-sm font-medium">
            Article Detail *
          </label>
          <textarea
            id="article_detail"
            name="article_detail"
            placeholder="Paste full article content..."
            value={formData.article_detail}
            onChange={handleChange}
            required
            className="min-h-[160px] w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>
              Words:{' '}
              {formData.article_detail.trim()
                ? formData.article_detail.trim().split(/\s+/).length
                : 0}
            </span>
            <span>
              {formData.article_detail.length}/{MAX_DETAIL}
            </span>
          </div>
        </div>

        {/* Date + Language */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="article_date" className="mb-1 block text-sm font-medium">
              Article Date *
            </label>
            <input
              id="article_date"
              name="article_date"
              type="date"
              value={formData.article_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="language" className="mb-1 block text-sm font-medium">
              Language *
            </label>
            <div className="relative">
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                {languages.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                slug: '',
                news_source_url: '',
                byline_author: '',
                article_detail: '',
                article_date: today,
                language: 'hindi',
              });
              setImageFile(null);
              setTouchedSlugManually(false);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            disabled={submitting}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting && (
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {submitting ? 'Submitting...' : 'Submit Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewsForm;
