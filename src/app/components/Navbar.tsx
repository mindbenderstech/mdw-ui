'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, availableLanguages } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

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
          <Link href="/" className="hover:bg-white hover:text-black px-2 py-2 rounded ml-6" aria-label="Go to homepage">Home</Link>
          <Link href={`/category/business/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded ml-3" aria-label="Go to Business category">Business</Link>
          <Link href={`/category/entertainment/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded" aria-label="Go to Entertainment category">Entertainment</Link>
          <Link href={`/category/sports/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded" aria-label="Go to Sports category">Sports</Link>
          <Link href={`/category/crime/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded" aria-label="Go to Crime category">Crime</Link>
          <Link href={`/category/politics/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded" aria-label="Go to Politics category">Politics</Link>
          <Link href={`/category/astro/${language}`} className="hover:bg-white hover:text-black px-2 py-2 rounded" aria-label="Go to Spiritual category">Spiritual</Link>
        </div>

        {/* Right side: Search, Login, Language Selector */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block md:block lg:block xl:block">
            <input
              type="text"
              placeholder="Search..."
              className="ml-4 px-4 py-2 rounded-md text-black pl-2 pr-10 focus:outline-none bg-white w-24 sm:w-32 md:w-48 lg:w-48 xl:w-48"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white hover:bg-indigo-800 p-1 rounded focus:outline-none" aria-label="Search">
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
              className="bg-teal-600 text-white px-2 py-2 rounded-md shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200"
              aria-label="Select language"
            >
              {availableLanguages.map((lang) => (
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
              className="w-4 h-5 absolute right-0 top-1/2 transform -translate-y-1/2 text-white"
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
            <Link href="/" className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to homepage">Home</Link>
            <Link href={`/category/business/${language}`} className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to Business category">Business</Link>
            <Link href={`/category/entertainment/${language}`} className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to Entertainment category">Entertainment</Link>
            <Link href={`/category/sports/${language}`} className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to Sports category">Sports</Link>
            <Link href={`/category/crime/${language}`} className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to Crime category">Crime</Link>
            <Link href={`/category/politics/${language}`} className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to Politics category">Politics</Link>
            <Link href={`/category/astro/${language}`} className="hover:text-blue-600" onClick={closeMenu} aria-label="Go to Spiritual category">Spiritual</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
