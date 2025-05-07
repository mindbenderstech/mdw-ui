'use client';

import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-teal-700 border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left side: Media World and Navigation Links */}
        <div className="flex items-center space-x-2">
          <span className="text-white text-xl font-bold tracking-wide">🌐 Media World</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-white uppercase tracking-wide ml-6">
          <Link href="/" className="hover:bg-white hover:text-black px-2 py-2 rounded ml-3">Home</Link>
          <Link href="/category/business" className="hover:bg-white hover:text-black px-2 py-2 rounded">Business</Link>
          <Link href="/category/entertainment" className="hover:bg-white hover:text-black px-2 py-2 rounded">Entertainment</Link>
          <Link href="/category/sports" className="hover:bg-white hover:text-black px-2 py-2 rounded">Sports</Link>
          <Link href="/category/crime" className="hover:bg-white hover:text-black px-2 py-2 rounded">Crime</Link>
          <Link href="/category/india" className="hover:bg-white hover:text-black px-2 py-2 rounded">Country</Link>
          <Link href="/category/politics" className="hover:bg-white hover:text-black px-2 py-2 rounded">Politics</Link>
        </div>

        {/* Right side: Search Box and Login Button */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md text-black pl-2 pr-10 focus:outline-none bg-white"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white hover:bg-indigo-800 p-1 rounded focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 10-7 7 7 7 0 007-7z" />
              </svg>

            </button>
          </div>
          <button className="text-white px-3 py-2 rounded-md hover:bg-red-500 focus:outline-none">
            Login
          </button>
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
