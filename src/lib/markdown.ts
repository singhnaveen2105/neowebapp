import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import type { Article, Category, SearchableArticle, TOCHeading } from "./types";
import { formatDate } from "./utils";

const contentDirectory = path.join(process.cwd(), "content");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  let tags: string[] = data.tags ?? [];
  const category = data.category as string;
  if (category && !tags.some((t) => t.toLowerCase() === category.toLowerCase())) {
    tags = [category, ...tags];
  }

  return {
    slug,
    title: data.title,
    category: data.category as Category,
    topic: data.topic,
    tags,
    timeToRead: data.timeToRead,
    postedDate: data.postedDate,
    excerpt: data.excerpt,
    author: data.author,
    content,
  };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  const lower = tag.toLowerCase();
  return getAllArticles().filter((a) =>
    a.tags.some((t) => t.toLowerCase() === lower)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const article of getAllArticles()) {
    for (const tag of article.tags) {
      tags.add(tag.toLowerCase());
    }
  }
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const article of getAllArticles()) {
    categories.add(article.category);
  }
  return Array.from(categories);
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypePrettyCode, {
      theme: { dark: "one-dark-pro", light: "github-light" },
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(result);
}

export function extractTOC(markdown: string): TOCHeading[] {
  const headings: TOCHeading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({
        id: slugify(text),
        text,
        level,
      });
    }
  }
  return headings;
}

export function toSearchable(articles: Article[]): SearchableArticle[] {
  return articles.map(
    ({ slug, title, excerpt, category, topic, tags, postedDate, timeToRead, author }) => ({
      slug,
      title,
      excerpt,
      category,
      topic,
      tags,
      postedDate,
      timeToRead,
      author,
    })
  );
}

export { formatDate };
