import Container from "@/components/Container";
import SearchBar from "@/components/blog/SearchBar";
import { getAllArticles, toSearchable } from "@/lib/markdown";

export const metadata = {
  title: "All Articles",
  description: "Browse all tech articles on Java, cloud, Kafka, GraphQL, and more.",
};

export default function BlogPage() {
  const articles = toSearchable(getAllArticles());

  return (
    <Container>
      <div className="py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          All Articles
        </h1>
        <SearchBar articles={articles} />
      </div>
    </Container>
  );
}
