import Container from "@/components/Container";
import ArticleGrid from "@/components/blog/ArticleGrid";
import { getAllTags, getArticlesByTag, toSearchable } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `Articles tagged with "${decoded}"`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const articles = toSearchable(getArticlesByTag(decoded));
  const countLabel =
    articles.length === 1 ? "1 article" : `${articles.length} articles`;

  return (
    <Container>
      <div className="py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            #{decoded}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {countLabel}
          </p>
        </header>
        <ArticleGrid articles={articles} />
      </div>
    </Container>
  );
}
