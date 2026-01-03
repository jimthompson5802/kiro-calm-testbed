---
inclusion: fileMatch
fileMatchPattern: "*.calm.json|calm/**/*.json|**/calm.json|*.architecture.json|architecture/**/*.json"
priority: 1
description: "Comprehensive CALM architecture guidance with auto-activation for CALM files"
category: "overview"
---

# CALM Architecture Overview

This steering file provides comprehensive guidance for working with FINOS CALM (Common Architecture Language Model) architectures. CALM is a declarative, JSON-based modeling language for describing complex software architectures, particularly in regulated environments like financial services.

## Auto-Activation Context

This guidance automatically activates when you're working with:
- `*.calm.json` files (CALM architecture files)
- Files in `calm/` directories
- `*.architecture.json` files
- Files in `architecture/` directories
- Any JSON file containing CALM schema references

## What is CALM?

CALM enables architects and developers to:
- Model complex distributed systems declaratively
- Validate architectural constraints and compliance requirements
- Generate documentation and visualizations from code
- Ensure consistency across teams and projects

## Core CALM Concepts

### Nodes
Nodes represent computational units in your architecture (services, databases, functions, etc.). Each node has:
- **Unique identifier**: Used for referencing in relationships
- **Node type**: Defines the category (service, database, function, etc.)
- **Interfaces**: Define how the node communicates
- **Properties**: Metadata and configuration

### Relationships
Relationships define how nodes interact:
- **Connects**: Basic connectivity between nodes
- **Interacts**: Bidirectional communication
- **Composes**: Hierarchical composition relationships

### Interfaces
Interfaces define communication protocols:
- **REST APIs**: HTTP-based services
- **Message queues**: Asynchronous communication
- **Database connections**: Data persistence layers
- **Custom protocols**: Domain-specific interfaces

### Patterns
Patterns provide reusable architectural templates:
- **Microservices**: Distributed service architectures
- **Event-driven**: Asynchronous messaging patterns
- **Layered**: Traditional n-tier architectures

## Kiro Integration Features

### Context-Aware Assistance
- **Smart Suggestions**: Based on current file type and content
- **Schema Validation**: Real-time validation against CALM v1.0 schema
- **Auto-Completion**: JSON snippets for common CALM patterns
- **Error Detection**: Proactive identification of schema violations

### Workflow Optimization
- **File Organization**: Recommendations for CALM project structure
- **Naming Conventions**: Consistent naming patterns for nodes and interfaces
- **Validation Integration**: Seamless integration with CALM CLI validation
- **Documentation Generation**: Automated flow and documentation creation

## Getting Started

When working with CALM files, I can help you with:
- Creating and validating node definitions
- Designing relationships between components
- Implementing interface specifications
- Applying architectural patterns
- Generating documentation and flows
- CLI command guidance and troubleshooting

Ask me about any CALM concept or task, and I'll provide specific guidance based on the CALM specification and best practices.

## Tool Prompts Available

I have access to specialized tool prompts for:

- **Architecture Creation**: This guide provides instructions for creating complete CALM architecture documents that comply wi...

- **Control Creation**: The complete control schema from the FINOS CALM v1.0 specification:

- **Documentation Creation**: This guide covers creating documentation from CALM architectures using the calm-widgets framework...

- **Flow Creation**: The complete flow schema from the FINOS CALM v1.0 specification:

- **Interface Creation**: The complete interface schema from the FINOS CALM v1.0 specification:

- **Metadata Creation**: The complete metadata schema from the FINOS CALM v1.0 specification:

- **Node Creation**: Nodes represent the "boxes" in a typical architecture diagram and are the fundamental building bl...

- **Pattern Creation**: Patterns in CALM are JSON schemas that provide reusable, instantiable architecture templates. The...

- **Relationship Creation**: Relationships connect nodes in your architecture and define how they interact or are organized.

- **Standards Creation**: Standards are JSON Schema 2020-12 documents that extend core CALM components with organization-sp...

- **Calm Cli Instructions**: The CALM CLI provides command-line utilities for working with Common Architecture Language Model ...


These prompts contain detailed guidance for specific CALM tasks and are automatically available when you're working with CALM architectures.

## Quick Actions

Common tasks I can help with immediately:
1. **Validate Current File**: Check your CALM JSON against schema
2. **Add New Node**: Create properly structured node definitions
3. **Create Relationships**: Connect nodes with appropriate relationship types
4. **Apply Patterns**: Implement common architectural patterns
5. **Generate Documentation**: Create flows and documentation from your architecture
6. **CLI Guidance**: Get help with CALM CLI commands and options

Just ask me to help with any of these tasks!