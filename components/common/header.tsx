"use client";

import { FileText } from "lucide-react";
import NavLink from "../ui/nav-link";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8 py-4 border-b bg-white">
      {/* Left: Logo */}
      <NavLink href="/" className="flex items-center gap-2">
        <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-indigo-600 hover:rotate-12 transform transition duration-200 ease-in-out" />
        <span className="lg:text-xl font-semibold text-gray-900">DocChat</span>
      </NavLink>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink
          href="/#pricing"
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Pricing
        </NavLink>

        <SignedIn>
          <NavLink
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Your Summaries
          </NavLink>
          <NavLink
            href="/upload"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Upload PDF
          </NavLink>
        </SignedIn>
      </div>

      {/* Right: Auth & Upload Button */}
      <div className="flex items-center gap-3">
        {/* Upload PDF button (only when signed in) */}
        <SignedIn>
          {/* <Link href="/upload">
            <Button variant="secondary" size="sm">
              Upload PDF
            </Button>
          </Link> */}
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm">Get Started</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
}
