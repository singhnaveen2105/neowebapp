import { Feed } from "feed";
import { getAllArticles } from "./markdown";

export function generateRSSFeed(): string {
  const siteUrl = process.env.SITE_URL ?? "https://neo-tech-blog.dev";
  const articles = getAllArticles();

  const feed = new Feed({
    title: "Naveen Singh — Tech Blog",
    description: "Articles on Java, cloud, streaming, and full-stack development",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    copyright: `© ${new Date().getFullYear()} Naveen Singh`,
    author: { name: "Naveen Singh" },
  });

  for (const article of articles) {
    feed.addItem({
      title: article.title,
      id: `${siteUrl}/blog/${article.slug}`,
      link: `${siteUrl}/blog/${article.slug}`,
      description: article.excerpt,
      date: new Date(article.postedDate),
      category: [{ name: article.category }],
      author: [{ name: article.author }],
    });
  }

  return feed.rss2();
}
