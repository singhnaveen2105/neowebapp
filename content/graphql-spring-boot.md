---
title: "GraphQL in Spring Boot: Schema-First APIs"
category: "graphql"
topic: "Schema-first GraphQL with Spring"
tags: ["graphql", "spring-boot", "api"]
timeToRead: 9
postedDate: "2026-03-05"
excerpt: "Define a GraphQL schema, wire query and mutation controllers, and handle errors cleanly in Spring Boot."
author: "Navdeep Singh"
---

Spring for GraphQL supports schema-first development with annotated controllers mapping to your domain layer.

## Schema Definition

Place schemas under `src/main/resources/graphql/`:

```graphql
type Query {
  bookById(id: ID!): Book
}

type Mutation {
  createBook(input: BookInput!): Book
}

type Book {
  id: ID!
  title: String!
  author: String!
}
```

## Query Controller

```java
@Controller
public class BookQueryController {
  private final BookService bookService;

  @QueryMapping
  public Book bookById(@Argument String id) {
    return bookService.findById(id).orElse(null);
  }
}
```

## Mutation and Error Handling

```java
@MutationMapping
public Book createBook(@Argument BookInput input) {
  return bookService.create(input);
}
```

Return structured errors with `@GraphQlExceptionHandler` for domain failures instead of leaking stack traces to clients.

## Testing

Use `@GraphQlTest` to slice-test resolvers without starting the full web stack—fast feedback on schema changes.
