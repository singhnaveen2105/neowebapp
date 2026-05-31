"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { Category } from "@/lib/types";
import type { SearchableArticle } from "@/lib/types";
import ArticleGrid from "./ArticleGrid";

export default function SearchBar({
  articles,
}: {
  articles: SearchableArticle[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: [
          { name: "title", weight: 0.35 },
          { name: "topic", weight: 0.25 },
          { name: "tags", weight: 0.2 },
          { name: "excerpt", weight: 0.15 },
          { name: "category", weight: 0.05 },
        ],
        threshold: 0.5,
        ignoreLocation: true,
        minMatchCharLength: 1,
        includeScore: true,
      }),
    [articles]
  );

  const usedCategories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category));
    return Array.from(cats).sort();
  }, [articles]);

  const filtered = useMemo(() => {
    let results = articles;
    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item);
    }
    if (activeCategory) {
      results = results.filter((a) => a.category === activeCategory);
    }
    return results;
  }, [articles, query, activeCategory, fuse]);

  const countLabel =
    filtered.length === 1
      ? "1 article found"
      : `${filtered.length} articles found`;

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          aria-hidden
        />
        <input
          type="text"
          placeholder="Search articles…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          All
        </button>
        {usedCategories.map((cat) => {
          const info = CATEGORIES[cat as Category];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : `${info?.bgColor ?? "bg-gray-100"} ${info?.color ?? "text-gray-700"}`
              }`}
            >
              {info?.label ?? cat}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{countLabel}</p>
      <ArticleGrid articles={filtered} />
    </div>
  );
}
