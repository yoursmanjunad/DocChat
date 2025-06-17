"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Assumes you have a `cn` function for classnames

export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-indigo-600",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-indigo-700",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
}
