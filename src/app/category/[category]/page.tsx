import Container from "@/components/Container";
import ArticleGrid from "@/components/blog/ArticleGrid";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import { getCategoryInfo } from "@/lib/categories";
import {
  getAllCategories,
  getArticlesByCategory,
  toSearchable,
} from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const info = getCategoryInfo(category);
  return {
    title: `${info.label} Articles`,
    description: info.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const info = getCategoryInfo(category);
  const articles = toSearchable(getArticlesByCategory(category));
  const Icon = info.icon;
  const countLabel =
    articles.length === 1 ? "1 article" : `${articles.length} articles`;

  return (
    <Container>
      <div className="py-12">
        <header className="mb-10">
          <BlogBreadcrumb category={category} />
          <div
            className={`mb-4 inline-flex rounded-xl p-4 ${info.bgColor}`}
          >
            <Icon className={`h-10 w-10 ${info.color}`} aria-hidden />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {info.label}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {info.description}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            {countLabel}
          </p>
        </header>
        <ArticleGrid articles={articles} />
      </div>
    </Container>
  );
}
