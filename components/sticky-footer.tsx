"use client";

import Link from "next/link";

export const StickyFooter = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap gap-x-6 text-sm font-bold text-neutral-300">
        <Link href="/about-us" className="hover:text-sky-400 transition-colors">
          About Us
        </Link>
        <Link href="/course-catalogue" className="hover:text-sky-400 transition-colors">
          Courses
        </Link>
        <Link href="/terms" className="hover:text-sky-400 transition-colors">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-sky-400 transition-colors">
          Privacy
        </Link>
      </div>

      <p className="text-xs font-bold text-neutral-400 mt-4 text-center">
        © {new Date().getFullYear()} Soft School. All rights reserved.
      </p>
    </div>
  );
};