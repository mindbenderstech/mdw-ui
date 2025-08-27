// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, availableLanguages } = useLanguage();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the code inside runs only on the client side
    setIsClient(true);
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

  // helper to render a hard-reload category link
  const Cat = ({ slug, children }: { slug: string; children: React.ReactNode }) => (
    <a
      href={`/category/${slug}/${language}`}
      className="hover:bg-white hover:text-black px-2 py-2 rounded"
      aria-label={`Go to ${slug} category`}
    >
      {children}
    </a>
  );

  if (!isClient) {
    // Return null or a fallback for SSR
    return null;
  }

  return (
    <nav className="bg-teal-700 border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl px-4 flex items-center justify-between h-16">
        <img
          src="/images/theheadlineworld navbar logo.png"
          alt="TheHeadlineWorld Logo"
          className="md:w-40 h-17 py-1 mr-6 object-contain sm:block w-20 h-15"
        />

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
          <div className="relative hidden sm:block md:block lg:block xl:block">
            <input
              type="text"
              placeholder="Search..."
              className="ml-4 px-4 py-2 rounded-md text-black pl-2 pr-10 focus:outline-none bg-white w-24 sm:w-32 md:w-48 lg:w-48 xl:w-48"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white hover:bg-indigo-800 p-1 rounded focus:outline-none"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 10-7 7 7 7 0 007-7z" />
              </svg>
            </button>
          </div>

          <button className="text-white px-3 py-2 rounded-md hover:bg-red-500 focus:outline-none" aria-label="Login">
            Login
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
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-blue-600 hover:text-blue-800 focus:outline-none" aria-label="Open mobile menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

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
  );
};

export default NavBar;
