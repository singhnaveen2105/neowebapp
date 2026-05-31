"use client";

import { useEffect, useState } from "react";
import type { TOCHeading } from "@/lib/types";

export default function TableOfContents({
  headings,
}: {
  headings: TOCHeading[];
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const last = visible[visible.length - 1];
          setActiveId(last.target.id);
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
        On this page
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={heading.level === 3 ? { paddingLeft: "1rem" } : undefined}
          >
            <a
              href={`#${heading.id}`}
              className={`block transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                activeId === heading.id
                  ? "font-medium text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
