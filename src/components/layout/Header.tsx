"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { IoMdMenu } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Citation Checker
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 group"
            >
              <span className="relative z-10">Home</span>
            </Link>
            <Link
              href="/about"
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 group"
            >
              <span className="relative z-10">About</span>
            </Link>
          </nav>

          {/* Login Button */}
          <div className="items-center md:block hidden">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-2">
                Login
              </Button>
            </Link>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 text-2xl p-2 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
              aria-label="Toggle mobile menu"
            >
              <IoMdMenu
                className={`transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`absolute top-full left-0 right-0 z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-64 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="border-t border-gray-200 px-6 py-4 space-y-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 font-medium py-3 px-2 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 font-medium py-3 px-2 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:translate-x-1"
          >
            About
          </Link>
          <div className="pt-2 border-t border-gray-100">
            <Link href="/app/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
