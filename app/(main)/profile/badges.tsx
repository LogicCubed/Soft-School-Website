"use client";

import { Badge } from "./badge";
import Link from "next/link";

export const Badges = () => {
  return (
    <section className="my-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-white text-2xl">Badges</h1>
        <Link
          href="/profile/badges"
          className="text-sky-400 text-2xl font-bold"
        >
          View All
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-6">
        <div className="w-full">
            <Badge name="Test" icon="/characters/hux.svg" />
        </div>
      </div>
    </section>
  );
};