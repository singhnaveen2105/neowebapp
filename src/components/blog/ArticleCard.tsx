import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { SearchableArticle } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";
import TagList from "./TagList";

export default function ArticleCard({
  article,
}: {
  article: SearchableArticle;
}) {
  return (
    <article className="group flex h-full flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div className="flex items-center justify-between">
        <CategoryBadge category={article.category} />
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {article.timeToRead}m
        </span>
      </div>
      <Link href={`/blog/${article.slug}`} className="flex flex-col gap-2">
        <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {article.excerpt}
        </p>
      </Link>
      <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5" aria-hidden />
          {formatDate(article.postedDate)}
        </span>
        <TagList tags={article.tags} limit={3} />
      </div>
    </article>
  );
}
