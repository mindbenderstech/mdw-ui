'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { searchArticles, Article } from '@/utils/api';  // Import Article type

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // mobile search toggle

  // Define the state type for searchResults
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true); // Update the state after the component mounts
  }, []);

  const langs = (availableLanguages && availableLanguages.length
    ? availableLanguages
    : ['hindi', 'english', 'marathi', 'kannada']);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const replaceLanguageInPath = (path: string, newLang: string) => {
    const qs = searchParams?.toString();
    const suffix = qs ? `?${qs}` : '';
    const parts = path.split('/').filter(Boolean);

    if (parts.length === 0) return `/${newLang}${suffix}`;

    // Article page: /news/[language]/[slug...] -> go to home in new language
    if (parts[0] === 'news') {
      return `/${newLang}${suffix}`;
    }

    // Category page: /category/[slug]/[language] -> keep slug, swap lang
    if (parts[0] === 'category') {
      if (parts.length >= 3) parts[2] = newLang;
      else return `/${newLang}${suffix}`;
      return '/' + parts.join('/') + suffix;
    }

    // Home page: /[language] -> swap lang
    const idx = parts.findIndex(seg => langs.includes(seg));
    if (idx >= 0) {
      parts[idx] = newLang;
      return '/' + parts.join('/') + suffix;
    }

    // Fallback: go home in new language
    return `/${newLang}${suffix}`;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const nextUrl = replaceLanguageInPath(pathname, newLang);
    window.location.assign(nextUrl); // hard reload
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      // Call backend search API
      const results = await searchArticles(searchQuery, language);
      setSearchResults(results);

      // Redirect to search results page
      router.push(`/search-results/${language}?query=${encodeURIComponent(searchQuery)}`);

      // Close mobile search after submit
      setIsSearchOpen(false);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const Cat = ({ slug, children }: { slug: string; children: React.ReactNode }) => (
    <a
      href={`/category/${slug}/${language}`}
      className="hover:bg-white hover:text-black px-2 py-2 rounded"
      aria-label={`Go to ${slug} category`}
    >
      {children}
    </a>
  );

  // Only render the NavBar if it's client-side
  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className="bg-teal-700 border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl px-4 flex items-center justify-between h-17">
          <Link href={`/${language}`} className="flex-shrink-0">
            <img
              src="/images/Theheadlineworld-logo1.png"
              alt="TheHeadlineWorld Logo"
              className="w-40 h-16 mr-6 object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 text-sm font-semibold text-white uppercase tracking-wide ml-6">
            <a href={`/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded ml-6">
              Home
            </a>
            <Cat slug="business">Business</Cat>
            <Cat slug="entertainment">Entertainment</Cat>
            <Cat slug="sports">Sports</Cat>
            <Cat slug="crime">Crime</Cat>
            <Cat slug="politics">Politics</Cat>
            <Cat slug="astro">Spiritual</Cat>
          </div>

          {/* Right side: Search, Login, Language Selector */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block md:block lg:block xl:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="ml-4 px-4 py-2 rounded-md text-black pl-2 pr-10 focus:outline-none bg-white w-24 sm:w-32 md:w-48 lg:w-48 xl:w-48"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white hover:bg-indigo-800 p-1 rounded focus:outline-none"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 10-7 7 7 7 0 007-7z" />
                </svg>
              </button>
            </form>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="sm:hidden text-white hover:bg-indigo-800 rounded"
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 10-7 7 7 7 0 007-7z" />
              </svg>
            </button>

            {/* Desktop Login Button */}
            <button className="hidden sm:block text-white px-3 py-2 rounded-md hover:bg-red-500 focus:outline-none" aria-label="Login">
              Login
            </button>

            {/* Mobile Login Icon */}
            <button
              className="sm:hidden text-white hover:bg-red-500 rounded-md focus:outline-none"
              aria-label="Login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a3 3 0 110 6 3 3 0 010-6zm0 12a7.978 7.978 0 01-4.9-1.7 5 5 0 019.8 0A7.978 7.978 0 0112 18z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-teal-600 text-white px-2 py-2 rounded-md shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                aria-label="Select language"
              >
                {langs.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-5 absolute right-0 top-1/2 -translate-y-1/2 text-white"
                aria-label="Language dropdown arrow"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Hamburger for Mobile */}
          <div className="md:hidden ml-1 flex items-center">
            <button onClick={toggleMenu} className="text-blue-600 hover:text-blue-800 focus:outline-none" aria-label="Open mobile menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="sm:hidden absolute top-17 left-0 w-full bg-white p-3 shadow-md z-50">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-md text-black pl-2 pr-10 focus:outline-none bg-gray-100"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 10-7 7 7 7 0 007-7z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col space-y-4 p-4 text-sm font-semibold uppercase">
              <a href={`/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Home
              </a>
              <a href={`/category/business/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Business
              </a>
              <a href={`/category/entertainment/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Entertainment
              </a>
              <a href={`/category/sports/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Sports
              </a>
              <a href={`/category/crime/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Crime
              </a>
              <a href={`/category/politics/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Politics
              </a>
              <a href={`/category/astro/${language}`} onClick={closeMenu} className="hover:text-blue-600">
                Spiritual
              </a>
            </div>
          </div>
        )}
      </nav>
    </Suspense>
  );
};

export default NavBar;
