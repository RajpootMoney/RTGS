"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Industries", href: "/industries" },
    { name: "Shipping & Logistics", href: "/shipping" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-block">
          <img src="/logo.png" alt="RTGS PACK LLP" className="h-10 sm:h-12 lg:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-all duration-300 hover:text-accent nav-link-effect ${
                pathname === link.href ? "text-secondary" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/quote"
            className="bg-primary text-white px-5 py-2 rounded-md font-semibold hover:bg-secondary hover:scale-105 active:scale-98 hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-4 p-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block font-medium ${
                    pathname === link.href ? "text-secondary" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/quote"
                className="block text-center bg-primary text-white px-4 py-2 rounded-md font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
