import React from 'react';
import Head from 'next/head';
import SEO from './SEO';

export default function Layout({ children, title, description, keywords }) {
  return (
    <>
      <Head>
        <title>{title || 'Brothers Packaging'} </title>
        <meta name="description" content={description || 'Packaging solutions'} />
        {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      </Head>
      <header className="bg-primary text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Brothers Packaging</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-gray-800 text-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          © {new Date().getFullYear()} Brothers Packaging. All rights reserved.
        </div>
      </footer>
    </>
  );
}
