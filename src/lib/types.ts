export type Category =
  | "java"
  | "aws"
  | "ai"
  | "graphql"
  | "azure"
  | "opensearch"
  | "kafka"
  | "spring-boot"
  | "docker"
  | "kubernetes"
  | "react"
  | "nextjs"
  | "typescript";

export interface ArticleFrontmatter {
  title: string;
  category: Category;
  topic: string;
  tags: string[];
  timeToRead: number;
  postedDate: string;
  excerpt: string;
  author: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

export interface SearchableArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  topic: string;
  tags: string[];
  postedDate: string;
  timeToRead: number;
  author: string;
}
