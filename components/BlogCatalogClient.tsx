"use client";

import { useState } from "react";
import Link from "next/link";
import BlogCoverImage from "./BlogCoverImage";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  keywords?: string[];
}

export default function BlogCatalogClient({ blogs }: { blogs: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Packaging", "Logistics", "Sustainability", "Electronics"];

  // Filter logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower) ||
      blog.author.toLowerCase().includes(searchLower) ||
      (blog.keywords && blog.keywords.some((k) => k.toLowerCase().includes(searchLower)));

    return matchesCategory && matchesSearch;
  });

  // Calculate reading time helper
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles by title, keywords, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-full py-4 px-6 pl-14 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary shadow-sm transition-all duration-300 text-lg"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm active:scale-95 border ${
                selectedCategory === category
                  ? "bg-secondary border-secondary text-white shadow-md shadow-secondary/15"
                  : "bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover overflow-hidden transition-all duration-300 flex flex-col h-full hover:scale-[1.02] border border-gray-100"
            >
              {/* Image Header */}
              <div className="h-56 w-full bg-gradient-to-r from-primary to-secondary relative overflow-hidden flex items-center justify-center">
                <BlogCoverImage src={blog.coverImage} title={blog.title} isCatalog={true} />
                
                {/* Category Badge overlay */}
                <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                  <span className="flex items-center">
                    <span className="mr-1.5">👤</span> {blog.author}
                  </span>
                  <span>•</span>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{getReadingTime(blog.content)}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-secondary leading-snug">
                  <Link href={`/blog/${blog.slug}`} className="hover:text-secondary">
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="mt-auto inline-flex items-center text-secondary hover:text-primary font-bold group transition-colors duration-200 text-sm"
                >
                  <span>Read Full Article</span>
                  <svg
                    className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 max-w-md mx-auto">
          <span className="text-5xl block mb-4">🔍</span>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
          <p className="text-gray-500">
            We couldn&apos;t find any articles matching your search criteria. Try modifying your keywords or selected category.
          </p>
        </div>
      )}
    </div>
  );
}
