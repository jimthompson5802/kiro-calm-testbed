---
inclusion: fileMatch
fileMatchPattern: "*.pattern.json|**/patterns/**/*.json|calm/**/*.json|architecture/**/*.json"
priority: 3
description: "CALM architectural patterns with Kiro-optimized implementation guidance"
category: "patterns"
---

# CALM Architectural Patterns

This steering file provides guidance on applying common architectural patterns using FINOS CALM, optimized for Kiro's interactive development workflow. Patterns help ensure consistency, maintainability, and compliance with architectural standards.

## Kiro Pattern Features

### Interactive Pattern Application
- **Pattern Detection**: Automatically identify existing patterns in your architecture
- **Guided Implementation**: Step-by-step pattern application with real-time validation
- **Customization Support**: Adapt patterns to specific requirements with guidance
- **Pattern Validation**: Ensure pattern implementation follows best practices

### Smart Pattern Suggestions
- **Context-Aware Recommendations**: Suggest appropriate patterns based on current architecture
- **Compatibility Checking**: Verify pattern compatibility with existing components
- **Performance Implications**: Understand performance characteristics of different patterns
- **Compliance Alignment**: Ensure patterns meet regulatory and organizational requirements

## Microservices Pattern

### When to Use
- Distributed systems with independent deployment requirements
- Teams working on different business domains
- Need for technology diversity across services
- Scalability requirements vary by component

### Kiro-Optimized Implementation
I'll guide you through implementing this pattern step-by-step:

1. **Service Identification**: Help identify service boundaries
2. **Interface Design**: Create proper service interfaces
3. **Data Management**: Design data persistence strategies
4. **Communication Patterns**: Implement service-to-service communication
5. **Deployment Considerations**: Plan for independent deployments

### CALM Implementation Template
```json
{
  "nodes": [
    {
      "unique-id": "user-service",
      "node-type": "service",
      "name": "User Service",
      "description": "Manages user accounts and authentication",
      "interfaces": [
        {
          "unique-id": "user-api",
          "url": "https://api.example.com/users",
          "protocol": "REST"
        }
      ]
    },
    {
      "unique-id": "order-service", 
      "node-type": "service",
      "name": "Order Service",
      "description": "Handles order processing and management",
      "interfaces": [
        {
          "unique-id": "order-api",
          "url": "https://api.example.com/orders",
          "protocol": "REST"
        }
      ]
    }
  ],
  "relationships": [
    {
      "unique-id": "user-order-interaction",
      "relationship-type": "interacts",
      "parties": ["user-service", "order-service"],
      "protocol": "HTTPS"
    }
  ]
}
```

## Event-Driven Pattern

### When to Use
- Asynchronous processing requirements
- Loose coupling between components
- Event sourcing or CQRS architectures
- High-throughput, scalable systems

### Kiro Implementation Guidance
I'll help you implement event-driven patterns with:

1. **Event Identification**: Identify domain events and their producers/consumers
2. **Message Broker Setup**: Configure event infrastructure
3. **Event Schema Design**: Define event structures and versioning
4. **Consumer Implementation**: Create event handlers and processors
5. **Error Handling**: Implement dead letter queues and retry mechanisms

### CALM Implementation Template
```json
{
  "nodes": [
    {
      "unique-id": "event-bus",
      "node-type": "service",
      "name": "Event Bus",
      "description": "Central message broker for event distribution",
      "interfaces": [
        {
          "unique-id": "event-stream",
          "host": "events.internal.local",
          "port": 9092,
          "protocol": "Kafka"
        }
      ]
    },
    {
      "unique-id": "producer-service",
      "node-type": "service",
      "name": "Event Producer",
      "description": "Service that publishes events"
    },
    {
      "unique-id": "consumer-service", 
      "node-type": "service",
      "name": "Event Consumer",
      "description": "Service that processes events"
    }
  ],
  "relationships": [
    {
      "unique-id": "producer-to-bus",
      "relationship-type": "connects",
      "parties": ["producer-service", "event-bus"],
      "protocol": "Kafka"
    },
    {
      "unique-id": "bus-to-consumer",
      "relationship-type": "connects", 
      "parties": ["event-bus", "consumer-service"],
      "protocol": "Kafka"
    }
  ]
}
```

## Layered Architecture Pattern

### When to Use
- Traditional enterprise applications
- Clear separation of concerns required
- Regulatory compliance needs
- Team organization by technical layers

### Kiro Implementation Steps
1. **Layer Definition**: Define architectural layers and their responsibilities
2. **Interface Contracts**: Create contracts between layers
3. **Dependency Management**: Ensure proper dependency direction
4. **Data Flow Design**: Plan data flow through layers
5. **Testing Strategy**: Implement layer-specific testing approaches

### CALM Implementation Template
```json
{
  "nodes": [
    {
      "unique-id": "presentation-layer",
      "node-type": "service",
      "name": "Presentation Layer",
      "description": "User interface and API endpoints"
    },
    {
      "unique-id": "business-layer",
      "node-type": "service", 
      "name": "Business Layer",
      "description": "Business logic and rules"
    },
    {
      "unique-id": "data-layer",
      "node-type": "database",
      "name": "Data Layer",
      "description": "Data persistence and access"
    }
  ],
  "relationships": [
    {
      "unique-id": "presentation-to-business",
      "relationship-type": "connects",
      "parties": ["presentation-layer", "business-layer"]
    },
    {
      "unique-id": "business-to-data",
      "relationship-type": "connects",
      "parties": ["business-layer", "data-layer"]
    }
  ]
}
```

## API Gateway Pattern

### When to Use
- Multiple microservices need unified access
- Cross-cutting concerns (auth, logging, rate limiting)
- Client-specific API aggregation
- Legacy system integration

### Kiro Implementation Guidance
1. **Gateway Configuration**: Set up API gateway with proper routing
2. **Security Implementation**: Configure authentication and authorization
3. **Rate Limiting**: Implement traffic management
4. **Monitoring Setup**: Add observability and logging
5. **Backend Integration**: Connect to downstream services

### CALM Implementation Template
```json
{
  "nodes": [
    {
      "unique-id": "api-gateway",
      "node-type": "service",
      "name": "API Gateway",
      "description": "Central entry point for all client requests",
      "interfaces": [
        {
          "unique-id": "public-api",
          "url": "https://api.example.com",
          "protocol": "HTTPS"
        }
      ]
    },
    {
      "unique-id": "backend-service-1",
      "node-type": "service",
      "name": "Backend Service 1",
      "description": "First backend service"
    },
    {
      "unique-id": "backend-service-2",
      "node-type": "service",
      "name": "Backend Service 2", 
      "description": "Second backend service"
    }
  ],
  "relationships": [
    {
      "unique-id": "gateway-to-service-1",
      "relationship-type": "connects",
      "parties": ["api-gateway", "backend-service-1"]
    },
    {
      "unique-id": "gateway-to-service-2",
      "relationship-type": "connects",
      "parties": ["api-gateway", "backend-service-2"]
    }
  ]
}
```

## Kiro Pattern Selection Assistant

### Interactive Pattern Selection
Ask me: "What pattern should I use?" and I'll help you choose based on:
- **Current Architecture**: Analysis of existing components
- **Requirements**: Functional and non-functional requirements
- **Team Structure**: Development team organization
- **Technology Constraints**: Existing technology stack
- **Compliance Needs**: Regulatory and organizational requirements

### Pattern Combination Strategies
I can help you combine patterns effectively:
- **Microservices + Event-Driven**: Scalable, loosely coupled systems
- **Layered + API Gateway**: Traditional enterprise with modern API management
- **Event-Driven + CQRS**: High-performance read/write separation
- **Microservices + Layered**: Hybrid approaches for complex systems

## Pattern Implementation Workflow

### Step-by-Step Implementation
1. **Pattern Selection**: Choose appropriate pattern(s) for your use case
2. **Architecture Planning**: Design overall structure with pattern guidance
3. **Component Definition**: Create nodes following pattern conventions
4. **Interface Design**: Define communication patterns
5. **Relationship Modeling**: Connect components according to pattern rules
6. **Validation**: Ensure pattern implementation follows best practices
7. **Documentation**: Generate pattern documentation and rationale

### Continuous Validation
- **Pattern Compliance**: Verify implementation follows pattern rules
- **Best Practice Adherence**: Check against CALM and pattern best practices
- **Performance Implications**: Understand performance characteristics
- **Maintainability**: Ensure long-term maintainability of pattern implementation

## Quick Pattern Actions

I can immediately help you with:
- **Analyze Current Architecture**: Identify existing patterns and suggest improvements
- **Apply New Pattern**: Implement a specific pattern step-by-step
- **Validate Pattern Implementation**: Check pattern compliance and best practices
- **Combine Patterns**: Merge multiple patterns effectively
- **Generate Pattern Documentation**: Create documentation for pattern decisions
- **Refactor to Pattern**: Transform existing architecture to follow patterns

Just ask me to help with any pattern-related task, and I'll provide interactive, step-by-step guidance!