import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategoryInfo } from "@/lib/categories";

interface BlogBreadcrumbProps {
  category: string;
  /** When set, shows Blog → Category → Article; otherwise Blog → Category (current). */
  articleTitle?: string;
}

const linkClass =
  "font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400";

const currentClass = "font-medium text-gray-900 dark:text-gray-100";

export default function BlogBreadcrumb({
  category,
  articleTitle,
}: BlogBreadcrumbProps) {
  const { label: categoryLabel } = getCategoryInfo(category);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <li>
          <Link href="/blog" className={linkClass}>
            Blog
          </Link>
        </li>
        <li className="flex items-center gap-1" aria-hidden>
          <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
        </li>
        <li>
          {articleTitle ? (
            <Link href={`/category/${category}`} className={linkClass}>
              {categoryLabel}
            </Link>
          ) : (
            <span className={currentClass} aria-current="page">
              {categoryLabel}
            </span>
          )}
        </li>
        {articleTitle && (
          <>
            <li className="flex items-center gap-1" aria-hidden>
              <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
            </li>
            <li>
              <span className={currentClass} aria-current="page">
                {articleTitle}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
