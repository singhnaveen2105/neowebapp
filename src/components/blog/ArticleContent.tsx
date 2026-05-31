"use client";

import { useState } from "react";

const FONT_SIZES = ["prose-sm", "prose", "prose-lg", "prose-xl"] as const;
const SIZE_LABELS = ["S", "M", "L", "XL"];

export default function ArticleContent({ html }: { html: string }) {
  const [sizeIndex, setSizeIndex] = useState(1);

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Text size:</span>
        <button
          type="button"
          onClick={() => setSizeIndex((i) => Math.max(0, i - 1))}
          disabled={sizeIndex === 0}
          className="rounded px-2 py-1 font-bold hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
          aria-label="Decrease text size"
        >
          A-
        </button>
        <span className="min-w-[1.5rem] text-center font-medium">
          {SIZE_LABELS[sizeIndex]}
        </span>
        <button
          type="button"
          onClick={() => setSizeIndex((i) => Math.min(3, i + 1))}
          disabled={sizeIndex === 3}
          className="rounded px-2 py-1 font-bold hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
          aria-label="Increase text size"
        >
          A+
        </button>
      </div>
      <article
        className={`${FONT_SIZES[sizeIndex]} dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:before:content-none prose-code:after:content-none`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
