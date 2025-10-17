import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Script from "next/script"; // ✅ Added for Google Analytics
import NavBar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheHeadlineWorld",
  description: "Latest News from TheHeadlineWorld",
  verification: {
    google: "sN8hNKkyFmpdByYgzaUO2Ub4AJhKrBQLehBuf-J4eB4",
  },
  icons: {
    icon: "/images/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics 4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9F7E7P7PH9"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9F7E7P7PH9', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
          </Suspense>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
