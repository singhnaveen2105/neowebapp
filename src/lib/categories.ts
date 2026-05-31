import {
  Atom,
  Box,
  Brain,
  Cloud,
  Code,
  Coffee,
  FileCode,
  GitBranch,
  Leaf,
  Radio,
  Search,
  Server,
  Ship,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "./types";

export interface CategoryInfo {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  java: {
    label: "Java",
    icon: Coffee,
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/40",
    description: "Java programming, JVM internals, and ecosystem tools",
  },
  aws: {
    label: "AWS",
    icon: Cloud,
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    description: "Amazon Web Services, cloud architecture, and serverless",
  },
  ai: {
    label: "AI",
    icon: Brain,
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/40",
    description: "Artificial intelligence, machine learning, and LLMs",
  },
  graphql: {
    label: "GraphQL",
    icon: GitBranch,
    color: "text-pink-700 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/40",
    description: "GraphQL APIs, schema design, and tooling",
  },
  azure: {
    label: "Azure",
    icon: Server,
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    description: "Microsoft Azure cloud services and integrations",
  },
  opensearch: {
    label: "OpenSearch",
    icon: Search,
    color: "text-teal-700 dark:text-teal-400",
    bgColor: "bg-teal-100 dark:bg-teal-900/40",
    description: "OpenSearch, Elasticsearch, and full-text search",
  },
  kafka: {
    label: "Kafka",
    icon: Radio,
    color: "text-slate-700 dark:text-slate-400",
    bgColor: "bg-slate-200 dark:bg-slate-800/60",
    description: "Apache Kafka, event streaming, and messaging",
  },
  "spring-boot": {
    label: "Spring Boot",
    icon: Leaf,
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/40",
    description: "Spring Boot, Spring Cloud, and enterprise Java",
  },
  docker: {
    label: "Docker",
    icon: Box,
    color: "text-cyan-700 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/40",
    description: "Docker containers, images, and compose",
  },
  kubernetes: {
    label: "Kubernetes",
    icon: Ship,
    color: "text-indigo-700 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/40",
    description: "Kubernetes orchestration, Helm, and cluster management",
  },
  react: {
    label: "React",
    icon: Atom,
    color: "text-sky-700 dark:text-sky-400",
    bgColor: "bg-sky-100 dark:bg-sky-900/40",
    description: "React.js, hooks, state management, and patterns",
  },
  nextjs: {
    label: "Next.js",
    icon: FileCode,
    color: "text-neutral-700 dark:text-neutral-400",
    bgColor: "bg-neutral-200 dark:bg-neutral-800/60",
    description: "Next.js framework, SSR, SSG, and App Router",
  },
  typescript: {
    label: "TypeScript",
    icon: Code,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    description: "TypeScript type system, patterns, and best practices",
  },
};

const FALLBACK: CategoryInfo = {
  label: "",
  icon: Code,
  color: "text-gray-700 dark:text-gray-400",
  bgColor: "bg-gray-100 dark:bg-gray-800/60",
  description: "",
};

export function getCategoryInfo(slug: string): CategoryInfo {
  const info = CATEGORIES[slug as Category];
  if (info) return info;
  return {
    ...FALLBACK,
    label: slug,
    description: `Articles in ${slug}`,
  };
}
