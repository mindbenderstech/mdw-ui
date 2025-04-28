'use client';

import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 text-xl font-bold tracking-wide">🌐 Media World</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-900 uppercase tracking-wide">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/news" className="hover:text-blue-600">News</Link>
          <Link href="/business" className="hover:text-blue-600">Business</Link>
          <Link href="/entertainment" className="hover:text-blue-600">Entertainment</Link>
          <Link href="/sports" className="hover:text-blue-600">Sports</Link>
          <Link href="/lifestyle" className="hover:text-blue-600">Lifestyle</Link>
          <Link href="/technology" className="hover:text-blue-600">Technology</Link>
          <Link href="/elections" className="hover:text-blue-600">Elections</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-blue-600 hover:text-blue-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4 text-sm font-semibold uppercase">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/news" className="hover:text-blue-600">News</Link>
            <Link href="/business" className="hover:text-blue-600">Business</Link>
            <Link href="/entertainment" className="hover:text-blue-600">Entertainment</Link>
            <Link href="/sports" className="hover:text-blue-600">Sports</Link>
            <Link href="/lifestyle" className="hover:text-blue-600">Lifestyle</Link>
            <Link href="/technology" className="hover:text-blue-600">Technology</Link>
            <Link href="/elections" className="hover:text-blue-600">Elections</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
