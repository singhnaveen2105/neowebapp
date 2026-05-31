---
title: "Kafka with Spring Boot: Producers, Consumers, and DLQ"
category: "kafka"
topic: "Event streaming with Spring Kafka"
tags: ["kafka", "spring-boot", "messaging"]
timeToRead: 10
postedDate: "2026-03-15"
excerpt: "Set up Kafka producers and consumers in Spring Boot with dead-letter topics and idempotent publishing."
author: "Navdeep Singh"
---

Apache Kafka fits naturally into Spring Boot via `spring-kafka`. This guide covers a minimal yet production-minded setup.

## Producer Configuration

Enable idempotence to avoid duplicate messages during retries:

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      properties:
        enable.idempotence: true
        acks: all
```

```java
@Service
public class OrderEventPublisher {
  private final KafkaTemplate<String, OrderEvent> template;

  public void publish(OrderEvent event) {
    template.send("orders", event.orderId(), event);
  }
}
```

## Consumer with Retry and DLQ

Route poison pills to a dead-letter topic after retries:

```java
@KafkaListener(topics = "orders", groupId = "order-processor")
public void handle(OrderEvent event) {
  orderService.process(event);
}
```

```yaml
spring:
  kafka:
    listener:
      ack-mode: record
```

## Idempotency on the Consumer

Store processed message IDs in your database or Redis so redeliveries are safe:

```java
@Transactional
public void process(OrderEvent event) {
  if (processedIds.contains(event.eventId())) return;
  // business logic
  processedIds.add(event.eventId());
}
```
