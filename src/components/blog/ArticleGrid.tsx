import type { SearchableArticle } from "@/lib/types";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid({
  articles,
}: {
  articles: SearchableArticle[];
}) {
  if (articles.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500 dark:text-gray-400">
        No articles found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
