---
title: "Features of Java 21 You Should Know"
category: "java"
topic: "Features of Java 21"
tags: ["java21", "virtual threads", "pattern matching"]
timeToRead: 8
postedDate: "2026-03-20"
excerpt: "Explore virtual threads, pattern matching for switch, sealed classes, record patterns, and sequenced collections in Java 21."
author: "Navdeep Singh"
---

Java 21 is an LTS release that brings production-ready virtual threads and several language refinements worth adopting in new services.

## Virtual Threads

Virtual threads are lightweight threads managed by the JVM rather than the OS. They shine for I/O-bound workloads.

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
  IntStream.range(0, 10_000).forEach(i ->
    executor.submit(() -> {
      var response = httpClient.send(request, BodyHandlers.ofString());
      return response.body();
    })
  );
}
```

## Pattern Matching for switch

Switch expressions can now destructure types with guards:

```java
static String format(Object obj) {
  return switch (obj) {
    case Integer i when i > 0 -> "positive " + i;
    case Integer i -> "non-positive " + i;
    case String s -> "string: " + s;
    default -> obj.toString();
  };
}
```

## Sealed Classes and Record Patterns

Sealed hierarchies plus record patterns simplify exhaustive handling:

```java
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

static double area(Shape shape) {
  return switch (shape) {
    case Circle(var r) -> Math.PI * r * r;
    case Rectangle(var w, var h) -> w * h;
  };
}
```

## Sequenced Collections

New interfaces like `SequencedCollection` provide consistent first/last element access across lists and deques—handy for APIs that need predictable ordering semantics.
