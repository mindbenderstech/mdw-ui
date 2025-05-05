'use client';

import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-900 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <span className="text-white text-xl font-bold tracking-wide">🌐 Media World</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-white uppercase tracking-wide">
          <Link href="/" className="hover:bg-white hover:text-black px-2 py-2 rounded">Home</Link>
          <Link href="/category/business" className="hover:bg-white hover:text-black px-2 py-2 rounded">Business</Link>
          <Link href="/category/entertainment" className="hover:bg-white hover:text-black px-2 py-2 rounded">Entertainment</Link>
          <Link href="/category/sports" className="hover:bg-white hover:text-black px-2 py-2 rounded">Sports</Link>
          <Link href="/category/crime" className="hover:bg-white hover:text-black px-2 py-2 rounded">Crime</Link>
          <Link href="/category/india" className="hover:bg-white hover:text-black px-2 py-2 rounded">Country</Link>
          <Link href="/category/politics" className="hover:bg-white hover:text-black px-2 py-2 rounded">Politics</Link>
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
            <Link href="/category/business" className="hover:text-blue-600">Business</Link>
            <Link href="/category/entertainment" className="hover:text-blue-600">Entertainment</Link>
            <Link href="/category/sports" className="hover:text-blue-600">Sports</Link>
            <Link href="/category/crime" className="hover:text-blue-600">Crime</Link>
            <Link href="/category/india" className="hover:text-blue-600">Country</Link>
            <Link href="/category/politics" className="hover:text-blue-600">Politics</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
