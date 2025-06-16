// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext'; // Adjust path as necessary

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-teal-700 text-white mt-10 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 text-sm">
        <div>
          <h2 className="text-2xl font-bold mb-2">Headliness</h2>
          <p className="text-gray-100 leading-relaxed">
          Headliness is your gateway to fast, clear, and credible news from across World. We focus on delivering essential stories with clarity—stripped of fluff, packed with impact. Whether you&apos;re on the move or on a break, Media World keeps you informed without wasting your time.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Categories</h3>
          <ul className="space-y-1">
            <li><Link href={`/category/politics/${language}`} className="hover:underline">Politics</Link></li>
            <li><Link href={`/category/sports/${language}`} className="hover:underline">Sports</Link></li>
            <li><Link href={`/category/entertainment/${language}`} className="hover:underline">Entertainment</Link></li>
            <li><Link href={`/category/health/${language}`} className="hover:underline">Health</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">News</h3>
          <ul className="space-y-1">
            <li><Link href={`/category/maharashtra/${language}`} className="hover:underline">Maharashtra</Link></li>
            <li><Link href={`/category/india/${language}`} className="hover:underline">India</Link></li>
            <li><Link href={`/category/technology/${language}`} className="hover:underline">Technology</Link></li>
            <li><Link href={`/category/crime/${language}`} className="hover:underline">Crime News</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 text-center py-4 text-xs text-gray-300">
        © Implant Media Pvt. Ltd. | All rights reserved
      </div>
    </footer>
  );
}
