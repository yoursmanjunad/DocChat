"use client";

import { FileText } from "lucide-react";
import NavLink from "../ui/nav-link";

export default function Header() {
  // TODO: Replace this with real authentication logic
  const isLoggedIn = true; // or fetch from context/session/etc.

  return (
    <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8 py-4">
      {/* Left: Logo */}
      <NavLink href="/" className="flex items-center gap-2">
        <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-gray-800 hover:rotate-12 transform transition duration-200 ease-in-out" />
        <span className="lg:text-xl font-semibold text-gray-900">DocChat</span>
      </NavLink>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink
          href="/#pricing"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
        >
          Pricing
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink
              href="/summaries"
              className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition"
            >
              Your Summaries
            </NavLink>

            <NavLink
              href="/upload"
              className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition"
            >
              Upload PDF
            </NavLink>
          </>
        )}
      </div>

      {/* Right: Auth Links */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <NavLink
            href="/sign-in"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
          >
            Sign In
          </NavLink>
        ) : (
          <NavLink
            href="/profile"
            className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition"
          >
            Profile
          </NavLink>
        )}
      </div>
    </nav>
  );
}
