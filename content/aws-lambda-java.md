---
title: "AWS Lambda with Java and SnapStart"
category: "aws"
topic: "Serverless Java on Lambda"
tags: ["aws", "lambda", "snapstart"]
timeToRead: 7
postedDate: "2026-03-10"
excerpt: "Build a Java Lambda handler and enable SnapStart to cut cold-start latency for Spring and Corretto runtimes."
author: "Navdeep Singh"
---

Running Java on AWS Lambda is straightforward with the managed runtime, and SnapStart dramatically improves cold starts for certain workloads.

## Handler Interface

Implement `RequestHandler` for API Gateway proxy events:

```java
public class HelloHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
  @Override
  public APIGatewayProxyResponseEvent handle(APIGatewayProxyRequestEvent input, Context context) {
    var response = new APIGatewayProxyResponseEvent();
    response.setStatusCode(200);
    response.setBody("{\"message\":\"Hello from Lambda\"}");
    return response;
  }
}
```

## SAM Template with SnapStart

Enable SnapStart in your CloudFormation or SAM template:

```yaml
Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: java21
      Handler: com.example.HelloHandler::handleRequest
      SnapStart:
        ApplyOn: PublishedVersions
      MemorySize: 512
      Timeout: 30
```

## When SnapStart Helps

SnapStart snapshots initialized JVM state after startup. It works best for frameworks with heavy classpath initialization—measure p99 latency before and after enabling it in your region.
