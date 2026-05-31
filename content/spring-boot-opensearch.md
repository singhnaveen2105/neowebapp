---
title: "OpenSearch with Spring Boot"
category: "opensearch"
topic: "Full-text search with OpenSearch"
tags: ["opensearch", "spring-boot", "docker"]
timeToRead: 12
postedDate: "2026-02-28"
excerpt: "Run OpenSearch locally with Docker, map documents from Spring Data, and run native queries for advanced search."
author: "Navdeep Singh"
---

OpenSearch powers full-text search and analytics. Spring Data OpenSearch simplifies indexing and querying from your Boot apps.

## Docker Compose Setup

```yaml
services:
  opensearch:
    image: opensearchproject/opensearch:2
    environment:
      - discovery.type=single-node
      - plugins.security.disabled=true
    ports:
      - "9200:9200"
```

## Document Mapping

```java
@Document(indexName = "articles")
public class ArticleDocument {
  @Id
  private String id;
  @Field(type = FieldType.Text, analyzer = "english")
  private String title;
  @Field(type = FieldType.Text)
  private String body;
}
```

## Repository and Native Queries

```java
public interface ArticleSearchRepository extends ElasticsearchRepository<ArticleDocument, String> {
  List<ArticleDocument> findByTitleContaining(String keyword);
}
```

For complex relevance scoring, use the operations API with a native JSON query:

```java
var query = new StringQuery("""
  { "multi_match": { "query": "%s", "fields": ["title^2", "body"] } }
  """.formatted(term));
return operations.search(query, ArticleDocument.class);
```

## Index Lifecycle

Version indexes when mappings change—reindex into `articles-v2` and alias swap to avoid downtime on large corpora.
