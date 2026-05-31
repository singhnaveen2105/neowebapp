import { notFound } from "next/navigation";
import Container from "@/components/Container";
import ArticleContent from "@/components/blog/ArticleContent";
import ArticleMeta from "@/components/blog/ArticleMeta";
import CategoryBadge from "@/components/blog/CategoryBadge";
import TableOfContents from "@/components/blog/TableOfContents";
import TagList from "@/components/blog/TagList";
import {
  extractTOC,
  getArticleBySlug,
  getArticleSlugs,
  renderMarkdown,
} from "@/lib/markdown";

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const article = getArticleBySlug(slug);
    return {
      title: article.title,
      description: article.excerpt,
    };
  } catch {
    return { title: "Article" };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const html = await renderMarkdown(article.content);
  const toc = extractTOC(article.content);

  return (
    <Container>
      <div className="py-12">
        <header className="mb-8 max-w-3xl">
          <CategoryBadge category={article.category} />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {article.title}
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            {article.topic}
          </p>
          <div className="mt-4">
            <ArticleMeta
              author={article.author}
              postedDate={article.postedDate}
              timeToRead={article.timeToRead}
            />
          </div>
          <div className="mt-4">
            <TagList tags={article.tags} />
          </div>
        </header>

        <div className="flex gap-12">
          <div className="min-w-0 flex-1">
            <ArticleContent html={html} />
          </div>
          {toc.length > 0 && (
            <aside className="hidden w-64 shrink-0 xl:block">
              <TableOfContents headings={toc} />
            </aside>
          )}
        </div>
      </div>
    </Container>
  );
}
