---
inclusion: fileMatch
fileMatchPattern: "calm/**/*.json|*.architecture.json|*.pattern.json|**/patterns/**/*.json"
priority: 2
description: "Specialized CALM tool prompts with Kiro workflow optimization"
category: "tools"
---

# CALM Tool Guidance

This steering file provides access to specialized CALM tool prompts for specific architectural tasks. These tools help you create, validate, and document CALM architectures following best practices, optimized for Kiro's workflow patterns.

## Kiro-Optimized Features

### Smart Context Detection
- **File Type Recognition**: Automatically detects architecture vs pattern files
- **Content Analysis**: Understands current architecture structure
- **Incremental Guidance**: Provides next-step recommendations
- **Error Prevention**: Proactive validation during editing

### Workflow Integration
- **Real-time Validation**: Continuous schema checking as you type
- **Auto-suggestions**: Context-aware completions for CALM structures
- **Template Insertion**: Quick insertion of common CALM patterns
- **CLI Integration**: Seamless integration with CALM CLI commands

## Available Tools


### Architecture Creation

# CALM Architecture Creation Guide

## Overview

This guide provides instructions for creating complete CALM architecture documents that comply with the FINOS CALM v1.0 schema.

## Required Schema Structure

Every CALM architecture MUST include:

```json
{
    "$schema": "https://calm.finos.org/release/1.1/meta/calm.json",
    "unique-id": "string",
    "name": "string",
    "description": "string"
}
```

## Optional Top-Level Properties

```json
{
    "metadata": [],
    "nodes": [],
    "relationships": [],
    "flows": [],
    "controls": {}
}
```

## Architecture Creation Checklist

- [ ] Include required $schema reference to CALM v1.0
- [ ] Provide unique-id (kebab-case recommended)
- [ ] Add descriptive name and description
- [ ] Name file with `.architecture.json` suffix
- [ ] Add nodes array (even if empty initially)
- [ ] Add relationships array to connect nodes
- [ ] Include metadata array for operational info
**🚨 MANDATORY VALIDATION (Do not skip):**
- [ ] **Verify calm-cli is installed:** `which calm`
- [ ] **Run CALM validation:** `calm validate -a <filename>.architecture.json`
- [ ] **Review output for errors:** `jsonSchemaValidationOutputs`, `spectralSchemaValidationOutputs`
- [ ] **Fix ALL errors before proceeding** - Do not assume JSON validity equals CALM validity
- [ ] **Confirm output shows:** `"hasErrors": false, "hasWarnings": false`
- [ ] **Document any warnings addressed**

> **Note:** See **calm-cli-instructions.md** for complete CLI usage, validation modes, and options.

## Best Practices

1. **Naming**: Use descriptive, business-friendly names
2. **IDs**: Use kebab-case for unique-id values
3. **File Naming**: Architecture files should be suffixed with `.architecture.json` (e.g., `trading-system.architecture.json`)
4. **Modularity**: Consider using detailed-architecture for complex subsystems
5. **Validation**: Always validate before committing changes
6. **Documentation**: Include comprehensive descriptions

## Example Minimal Architecture

```json
{
    "$schema": "https://calm.finos.org/release/1.1/meta/calm.json",
    "unique-id": "example-trading-system",
    "name": "Example Trading System",
    "description": "A simple trading system architecture",
    "metadata": [
        {
            "version": "1.0.0",
            "created-by": "Architecture Team",
            "environment": "production"
        }
    ],
    "nodes": [],
    "relationships": []
}
```

---


### Control Creation

# CALM Control Creation Guide

## Critical Requirements

🚨 **ALWAYS call the control creation tool before creating any controls**

## Official JSON Schema Definition

The complete control schema from the FINOS CALM v1.0 specification:

```json
{
    "controls": {
        "type": "object",
        "patternProperties": {
            "^[a-zA-Z0-9-]+$": {
                "type": "object",
                "properties": {
                    "description": {
                        "type": "string",
                        "description": "A description of a control and how it applies to a given architecture"
                    },
                    "requirements": {
                        "type": "array",
                        "items": {
                            "$ref": "#/defs/control-detail"
                        }
                    }
                },
                "required": ["description", "requirements"]
            }
        }
    },
    "control-detail": {
        "type": "object",
        "properties": {
            "requirement-url": {
                "type": "string",
                "description": "The requirement schema that specifies how a control should be defined"
            },
            "config-url": {
                "type": "string",
                "description": "The configuration of how the control requirement schema is met"
            },
            "config": {
                "type": "object",
                "description": "Inline configuration of how the control requirement schema is met"
            }
        },
        "required": ["requirement-url"],
        "oneOf": [
            {
                "required": ["config-url"]
            },
            {
                "required": ["config"]
            }
        ]
    }
}
```

## Overview

Controls in CALM represent compliance policies, governance rules, and enforcement mechanisms applied to architecture elements.

## Standards Integration

**Most controls in CALM use Standards to define their requirements and specifications.** This creates points of consistency across a given domain and enables reusable control patterns.

### How Controls Use Standards

Controls work with Standards in the following way:

1. **Requirement Files**: The `requirement-url` points to a requirement.json file that defines what the control expects
2. **Configuration Files**: The `config-url` points to a configuration.json file that provides the actual configuration data
3. **Standards as Base Schemas**: Requirements may optionally use Standards as their base JSON schema to ensure consistency

**Example - NIST Control with Standard-based Requirement**:

```json
{
    "nist-access-control": {
        "description": "NIST 800-53 Access Control requirements for system authentication",
        "requirements": [
            {
                "requirement-url": "https://requirements.company.com/nist-ac2-requirement.json",
                "config": {
                    "documentNumber": "NIST SP 800-53",
                    "title": "Security and Privacy Controls for Federal Information Systems",
                    "status": "Final",
                    "seriesName": "Special Publication",
                    "controlFamily": "AC - Access Control",
                    "controlId": "AC-2"
                }
            }
        ]
    }
}
```

In this example, the `requirement-url` points to a requirement.json file. That requirement file may optionally use a NIST Document Standard as its JSON schema base to ensure all NIST controls follow consistent structure.

### Benefits of Standards with Controls

- **Consistency**: All requirement files using the same Standard follow identical structure
- **Validation**: Standards provide automatic schema validation for requirement file structure
- **Reusability**: Standards can be shared across multiple requirement files and organizations  
- **Compliance**: Industry frameworks like NIST, ISO 27001, SOC 2 can be modeled as Standards for requirement files

## Where Controls Can Be Applied

Controls can be applied at multiple levels within a CALM architecture:

### 1. Architecture Level (Document Root)

Applied to the entire architecture document - affects all components:

```json
{
    "calm-version": "1.0.0",
    "architecture-version": "1.0.0",
    "controls": {
        "data-residency": {
            "description": "All data must remain within EU boundaries",
            "requirements": [
                {
                    "requirement-url": "https://schemas.company.com/compliance/gdpr-residency.json",
                    "config": {
                        "allowed-regions": ["eu-west-1", "eu-central-1"],
                        "data-types": ["personal", "financial"]
                    }
                }
            ]
        }
    },
    "nodes": [...],
    "relationships": [...]
}
```

### 2. Node Level

Applied to specific components or services:

```json
{
    "unique-id": "payment-processor",
    "node-type": "service",
    "name": "Payment Processing Service",
    "controls": {
        "pci-compliance": {
            "description": "PCI-DSS requirements for payment card data processing",
            "requirements": [
                {
                    "requirement-url": "https://schemas.company.com/compliance/pci-dss.json",
                    "config": {
                        "scope": "cardholder-data",
                        "validation-level": "Level-1",
                        "encryption": "end-to-end"
                    }
                }
            ]
        }
    },
    "interfaces": [...]
}
```

### 3. Flow Level

Applied to business processes and data flows:

```json
{
    "unique-id": "trade-settlement-flow",
    "name": "Trade Settlement Process",
    "description": "End-to-end trade settlement workflow",
    "controls": {
        "settlement-compliance": {
            "description": "Regulatory requirements for trade settlement timing and reporting",
            "requirements": [
                {
                    "requirement-url": "https://schemas.company.com/compliance/finra-settlement.json",
                    "config": {
                        "settlement-period": "T+2",
                        "reporting-requirements": ["FINRA", "SEC"],
                        "audit-trail": "complete"
                    }
                }
            ]
        }
    },
    "transitions": [...]
}
```

### 4. Control Inheritance and Scope

- **Architecture-level controls** apply to all nodes, relationships, and flows unless overridden
- **Node-level controls** apply specifically to that component and its interfaces
- **Flow-level controls** apply to the entire business process flow
- **More specific controls override general ones** when there are conflicts
- **Controls are additive** - multiple levels can apply simultaneously

**Example of Control Layering:**

```json
{
    "controls": {
        "base-security": {
            "description": "Organization-wide security baseline",
            "requirements": [...]
        }
    },
    "nodes": [
        {
            "unique-id": "sensitive-service",
            "controls": {
                "enhanced-security": {
                    "description": "Additional security for sensitive data processing",
                    "requirements": [...]
                }
            }
        }
    ]
}
```

## Control Structure

Controls use a modular approach with external schema references:

```json
"controls": {
    "data-protection": {
        "description": "Ensures all sensitive data is properly protected according to compliance requirements",
        "requirements": [
            {
                "requirement-url": "https://schemas.company.com/controls/data-encryption.json",
                "config": {
                    "encryption-algorithm": "AES-256",
                    "key-rotation-period": "90-days",
                    "cipher-modes": ["GCM", "CBC"]
                }
            }
        ]
    },
    "access-control": {
        "description": "Implements role-based access control for all system components",
        "requirements": [
            {
                "requirement-url": "https://schemas.company.com/controls/rbac.json",
                "config-url": "https://configs.company.com/rbac/trading-system.json"
            }
        ]
    }
}
```

## Key Components

### Control Names

Control names use `patternProperties` with regex `^[a-zA-Z0-9-]+
### Control Creation

:

✅ **Valid**: `data-protection`, `access-control`, `audit-logging`
❌ **Invalid**: `data_protection`, `Data Protection`, `access.control`

### Required Properties

Each control MUST have:

- `description` (string) - Describes the control and how it applies
- `requirements` (array) - Array of control-detail objects (minimum 1)

### Control Details (Requirements)

Each requirement MUST have:

- `requirement-url` (string) - Schema defining the control requirement

Each requirement MUST have exactly ONE of:

- `config-url` (string) - External configuration file
- `config` (object) - Inline configuration

## Control Examples

**Security Controls with Inline Configuration:**

```json
"controls": {
    "encryption-in-transit": {
        "description": "All API communications must use TLS 1.3 encryption",
        "requirements": [
            {
                "requirement-url": "https://schemas.company.com/security/tls-encryption.json",
                "config": {
                    "protocol": "TLS",
                    "version": "1.3",
                    "cipher-suites": ["TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256"],
                    "certificate-authority": "Internal CA",
                    "cert-rotation": "90-days"
                }
            }
        ]
    }
}
```

**Compliance Controls with External Configuration:**

```json
"controls": {
    "audit-logging": {
        "description": "Comprehensive audit logging for all financial transactions",
        "requirements": [
            {
                "requirement-url": "https://schemas.company.com/compliance/audit-requirements.json",
                "config-url": "https://configs.company.com/audit/trading-system-audit.json"
            }
        ]
    }
}
```

**Multiple Requirements in One Control:**

```json
"controls": {
    "data-governance": {
        "description": "Complete data governance including encryption, retention, and access controls",
        "requirements": [
            {
                "requirement-url": "https://schemas.company.com/data/encryption.json",
                "config": {
                    "algorithm": "AES-256-GCM",
                    "key-management": "HSM-backed"
                }
            },
            {
                "requirement-url": "https://schemas.company.com/data/retention.json",
                "config": {
                    "retention-period": "7-years",
                    "archival-strategy": "cold-storage"
                }
            },
            {
                "requirement-url": "https://schemas.company.com/access/rbac.json",
                "config-url": "https://configs.company.com/rbac/data-access.json"
            }
        ]
    }
}
```

## Validation Rules

1. Control names must match pattern `^[a-zA-Z0-9-]+
### Control Creation

 (alphanumeric and hyphens only)
2. Each control must have `description` and `requirements` properties
3. Requirements array must have at least one control-detail object
4. Each control-detail must have `requirement-url`
5. Each control-detail must have either `config-url` OR `config` (not both)
6. Requirement URLs should be accessible schema definitions
7. External config URLs should be accessible configuration files

## Best Practices

- Use descriptive control names that reflect the security domain
- Reference external requirement schemas for consistency
- Use inline config for simple, static configurations
- Use external config-url for complex, environment-specific settings
- Include comprehensive descriptions explaining how controls apply
- Structure requirements to be independently verifiable
- Document the relationship between requirement schemas and configurations
- Regular review and updates for compliance changes

## Cross-References

- **Standards Creation**: See standards creation tool for creating requirement Standards that controls reference
- **Node Creation**: Understand how controls are applied to individual nodes
- **Flow Creation**: Learn how controls work with business processes and flows
- **Architecture Creation**: See how controls are structured at the architecture document level
- **Pattern Creation**: Use controls in reusable architectural patterns

## Key Reminders

- Most controls reference requirement files that may use Standards as their base schemas
- Controls can be applied at architecture, node, and flow levels
- Each control must have both description and requirements properties
- Use Standards for consistency in requirement files across compliance frameworks like NIST, ISO 27001, SOC 2
- Reference the standards creation tool when creating base schemas for requirement files

---


### Documentation Creation

# CALM Documentation Creation Guide

## Overview

This guide covers creating documentation from CALM architectures using the calm-widgets framework and related tooling.

## CALM Widgets Framework

The calm-widgets framework provides reusable components for visualizing and documenting CALM architectures:

- **Architecture Diagrams** - Visual representations of nodes and relationships
- **Node Details** - Component specifications and metadata
- **Flow Visualizations** - Business process flows
- **Control Matrices** - Compliance and governance views
- **Interface Catalogs** - API and communication documentation

## Documentation Generation Methods

### 1. CLI Docify Command

Generate static documentation sites:

```bash
calm docify \
  --architecture architecture.json \
  --output ./docs \
  --template-dir ./templates
```

### 2. Custom Templates

Create Handlebars templates for custom documentation:

**Node Documentation Template:**

```handlebars
{{#each nodes}}
    ##
    {{name}}

    **Type:**
    {{node-type}}
    **Description:**
    This guide covers creating documentation from CALM architectures using the calm-widgets framework...

    {{#if interfaces}}
        ### Interfaces
        {{#each interfaces}}
            - **{{unique-id}}**:
            {{#if host}}{{host}}:{{port}}{{/if}}{{#if url}}{{url}}{{/if}}
        {{/each}}
    {{/if}}

    {{#if metadata}}
        ### Metadata
        {{#each metadata}}
            {{#each this}}
                - **{{@key}}**:
                {{this}}
            {{/each}}
        {{/each}}
    {{/if}}

{{/each}}
```

**Relationship Documentation Template:**

```handlebars
{{#each relationships}}
    ##
    This guide covers creating documentation from CALM architectures using the calm-widgets framework...

    **Type:**
    {{relationship-type}}
    {{#if protocol}}**Protocol:** {{protocol}}{{/if}}

    {{#if relationship-type.connects}}
        **Source:**
        {{relationship-type.connects.source.node}}
        **Destination:**
        {{relationship-type.connects.destination.node}}
    {{/if}}

{{/each}}
```

### 3. Widget Integration

Embed CALM widgets in custom documentation:

**HTML Integration:**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Architecture Documentation</title>
        <script src="calm-widgets.js"></script>
    </head>
    <body>
        <div id="architecture-diagram"></div>
        <script>
            CalmWidgets.createArchitectureDiagram('#architecture-diagram', {
                architecture: architectureData,
                layout: 'dagre',
                showLabels: true,
            });
        </script>
    </body>
</html>
```

**React Integration:**

```jsx
import { ArchitectureDiagram, FlowChart } from '@finos/calm-widgets';

function ArchitectureDoc({ architecture }) {
    return (
        <div>
            <h1>{architecture.name}</h1>
            <ArchitectureDiagram
                data={architecture}
                layout="dagre"
                showLabels={true}
            />
            {architecture.flows && <FlowChart flows={architecture.flows} />}
        </div>
    );
}
```

## Documentation Templates

### Architecture Overview Template

```handlebars
# {{name}}

This guide covers creating documentation from CALM architectures using the calm-widgets framework...

## Architecture Diagram

{{> architecture-diagram}}

## Components

{{#each nodes}}
### {{name}}
This guide covers creating documentation from CALM architectures using the calm-widgets framework...

**Type:** {{node-type}}
{{#if data-classification}}**Data Classification:** {{data-classification}}{{/if}}

{{#if interfaces}}
#### Interfaces
{{#each interfaces}}
- **{{unique-id}}**: {{#if url}}{{url}}{{else}}{{host}}:{{port}}{{/if}}
{{/each}}
{{/if}}

{{/each}}

## Flows

{{#each flows}}
### This guide covers creating documentation from CALM architectures using the calm-widgets framework...

{{#each steps}}
{{@index}}. **This guide covers creating documentation from CALM architectures using the calm-widgets framework...**
   - Nodes: {{#each node-interactions}}{{node}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

{{/each}}
```

### Control Documentation Template

```handlebars
# Control Documentation ## Control Requirements

{{#each controls.control-requirements}}
    ###
    This guide covers creating documentation from CALM architectures using the calm-widgets framework...

    **ID:**
    {{unique-id}}
    **Source:**
    {{source}}

    {{#if metadata}}
        {{#each metadata}}
            {{#each this}}
                - **{{@key}}**:
                {{this}}
            {{/each}}
        {{/each}}
    {{/if}}

{{/each}}

## Control Configurations

{{#each controls.control-configurations}}
    ###
    This guide covers creating documentation from CALM architectures using the calm-widgets framework...

    **ID:**
    {{unique-id}}
    **Requirements:**
    {{#each requirements}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

    **Implementation:** - **Type:**
    {{implementation.type}}
    {{#each implementation.details}}
        - **{{@key}}:**
        {{this}}
    {{/each}}

{{/each}}
```

## Best Practices

### Documentation Structure

1. **Overview** - High-level architecture purpose and context
2. **Components** - Detailed node documentation
3. **Interfaces** - API and communication specifications
4. **Flows** - Business process documentation
5. **Controls** - Compliance and governance
6. **Deployment** - Infrastructure and operational details

### Automation

- Integrate documentation generation into CI/CD pipelines
- Use architecture validation before generating docs
- Automate deployment of documentation sites
- Version documentation with architecture changes

### Customization

- Create organization-specific templates
- Brand documentation with company styling
- Include additional context and guidelines
- Link to external resources and runbooks

## Output Formats

The calm-widgets framework supports multiple output formats:

- **Static HTML** - Self-contained documentation sites
- **Markdown** - Portable documentation format
- **PDF** - Printable documentation
- **Interactive Web** - Dynamic exploration interfaces

## Validation

Always validate architectures before generating documentation:

```bash
calm validate -a architecture.json --strict
```

This ensures documentation is generated from valid, schema-compliant CALM models.

> **Note:** See **calm-cli-instructions.md** for complete CLI usage, validation modes, and options.

---


### Flow Creation

# CALM Flow Creation Guide

## Critical Requirements

🚨 **ALWAYS call the flow creation tool before creating any flows**

## Official JSON Schema Definition

The complete flow schema from the FINOS CALM v1.0 specification:

```json
{
    "flow": {
        "type": "object",
        "properties": {
            "unique-id": {
                "type": "string",
                "description": "Unique identifier for the flow"
            },
            "name": {
                "type": "string",
                "description": "Descriptive name for the business flow"
            },
            "description": {
                "type": "string",
                "description": "Detailed description of the flow's purpose"
            },
            "requirement-url": {
                "type": "string",
                "description": "Link to a detailed requirement document"
            },
            "transitions": {
                "type": "array",
                "items": {
                    "$ref": "#/defs/transition"
                },
                "minItems": 1
            },
            "controls": {
                "$ref": "control.json#/defs/controls"
            },
            "metadata": {
                "$ref": "core.json#/defs/metadata"
            }
        },
        "required": ["unique-id", "name", "description", "transitions"],
        "additionalProperties": false
    },
    "transition": {
        "type": "object",
        "properties": {
            "relationship-unique-id": {
                "type": "string",
                "description": "Unique identifier for the relationship in the architecture"
            },
            "sequence-number": {
                "type": "integer",
                "description": "Indicates the sequence of the relationship in the flow"
            },
            "description": {
                "type": "string",
                "description": "Functional summary of what is happening in the transition"
            },
            "direction": {
                "enum": ["source-to-destination", "destination-to-source"],
                "default": "source-to-destination"
            }
        },
        "required": ["relationship-unique-id", "sequence-number", "description"]
    }
}
```

## Overview

Flows in CALM represent business processes that traverse your architecture, showing how data and operations move through existing relationships between nodes.

## Required Properties

Every flow MUST have:

- `unique-id` (string)
- `name` (string) - Descriptive name for the business flow
- `description` (string) - Detailed description of the flow's purpose
- `transitions` (array of transition objects) - Minimum 1 transition

## Flow Structure

```json
{
    "unique-id": "trade-execution-flow",
    "name": "Trade Execution Process",
    "description": "End-to-end trade execution process from order submission to settlement",
    "requirement-url": "https://docs.company.com/trading/requirements/execution-flow.md",
    "transitions": [
        {
            "relationship-unique-id": "client-to-api-connection",
            "sequence-number": 1,
            "description": "Client submits trade order to API",
            "direction": "source-to-destination"
        },
        {
            "relationship-unique-id": "api-to-database-connection",
            "sequence-number": 2,
            "description": "API stores trade order in database",
            "direction": "source-to-destination"
        }
    ],
    "metadata": {
        "business-owner": "Trading Operations",
        "sla": "< 500ms end-to-end",
        "throughput": "10,000 trades/second peak"
    }
}
```

## Transition Properties

Each transition requires:

- `relationship-unique-id` - Must reference an existing relationship in the architecture
- `sequence-number` - Integer indicating the order of this transition in the flow
- `description` - What happens in this transition

Optional transition properties:

- `direction` - Either "source-to-destination" (default) or "destination-to-source"

## Key Concepts

**Flows use existing relationships**: Transitions must reference relationships that already exist in your architecture. Flows don't create new connections - they describe how business processes move through existing architectural relationships.

**Direction matters**: Each transition can flow in either direction of a relationship:

- `source-to-destination` (default): From the relationship's `from` node to its `to` node
- `destination-to-source`: From the relationship's `to` node back to its `from` node

## Complete Flow Example

```json
{
    "unique-id": "customer-onboarding-flow",
    "name": "Customer Onboarding Process",
    "description": "Complete customer onboarding and account creation process with compliance checks",
    "requirement-url": "https://docs.company.com/customer/onboarding-requirements.md",
    "transitions": [
        {
            "relationship-unique-id": "portal-to-identity-service",
            "sequence-number": 1,
            "description": "Customer submits identity documents through portal",
            "direction": "source-to-destination"
        },
        {
            "relationship-unique-id": "identity-service-to-kyc-database",
            "sequence-number": 2,
            "description": "Identity service stores documents for KYC verification",
            "direction": "source-to-destination"
        },
        {
            "relationship-unique-id": "kyc-database-to-compliance-service",
            "sequence-number": 3,
            "description": "Compliance service retrieves documents for review",
            "direction": "destination-to-source"
        },
        {
            "relationship-unique-id": "compliance-service-to-account-service",
            "sequence-number": 4,
            "description": "Compliance approval triggers account creation",
            "direction": "source-to-destination"
        }
    ],
    "metadata": {
        "business-owner": "Customer Operations",
        "sla": "24 hours completion",
        "compliance": ["KYC", "AML", "GDPR"],
        "automation-level": "75%",
        "monthly-volume": "5000 new customers"
    }
}
```

## Optional Properties

**requirement-url**: Link to detailed business requirements

```json
"requirement-url": "https://docs.company.com/flows/trade-execution.md"
```

**controls**: Reference to control requirements (see control creation tool)

```json
"controls": {
    "control-requirements": ["data-encryption", "audit-logging"]
}
```

**metadata**: Additional flow information (see metadata creation tool)

```json
"metadata": {
    "business-criticality": "high",
    "peak-throughput": "1000 transactions/minute"
}
```

## Validation Rules

1. `unique-id` must be unique across all flows in the architecture
2. `transitions` array must have at least 1 transition (`minItems: 1`)
3. Each `relationship-unique-id` must reference an existing relationship in the architecture
4. `sequence-number` should start from 1 and increment logically
5. `direction` must be either "source-to-destination" or "destination-to-source"
6. All required properties must be present

## Best Practices

- Use descriptive flow names that reflect the business process
- Include requirement-url for traceability to business documentation
- Order transitions logically with sequential numbering
- Add metadata for operational and compliance information
- Reference existing relationships - don't invent new connections
- Use clear, business-focused descriptions for each transition

---


### Interface Creation

# CALM Interface Creation Guide

## Critical Requirements

🚨 **ALWAYS call the interface creation tool before creating any interfaces**

## Official JSON Schema Definition

The complete interface schema from the FINOS CALM v1.0 specification:

```json
{
    "interface-definition": {
        "type": "object",
        "description": "A modular interface definition referencing an external schema",
        "properties": {
            "unique-id": {
                "type": "string",
                "description": "Unique identifier for this interface instance"
            },
            "definition-url": {
                "type": "string",
                "description": "URI of the external schema this interface configuration conforms to"
            },
            "config": {
                "type": "object",
                "description": "Inline configuration conforming to the external interface schema"
            }
        },
        "required": ["unique-id", "definition-url", "config"],
        "additionalProperties": false
    },
    "interface-type": {
        "type": "object",
        "properties": {
            "unique-id": {
                "type": "string"
            }
        },
        "required": ["unique-id"],
        "additionalProperties": true
    },
    "node-interface": {
        "type": "object",
        "properties": {
            "node": {
                "type": "string"
            },
            "interfaces": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            }
        },
        "required": ["node"]
    }
}
```

## oneOf Constraint

Each interface MUST be exactly ONE of:

1. **interface-definition** (modular approach) - References external schema with strict validation
2. **interface-type** (flexible approach) - Allows any properties with `additionalProperties: true`

⚠️ **NEVER mix properties from both approaches!**

**Key Differences**:

- `interface-definition`: `additionalProperties: false` - Only allows `unique-id`, `definition-url`, and `config`
- `interface-type`: `additionalProperties: true` - Allows any properties beyond `unique-id`

## Option 1: interface-definition (Modular)

Required properties:

- `unique-id` (string)
- `definition-url` (string) - Must be an accessible URL to the interface schema definition
- `config` (object) - Must conform to the schema specification provided at the definition-url

Must NOT have: host, port, hostname, url, etc.

```json
{
    "unique-id": "http-api-interface",
    "definition-url": "https://example.com/schemas/http-service.json",
    "config": {
        "host": "api.internal.local",
        "port": 8080,
        "protocol": "HTTP",
        "base-path": "/api/v1"
    }
}
```

## Option 2: interface-type (Flexible)

Required: `unique-id` + any additional properties you need

The `interface-type` schema allows `additionalProperties: true`, meaning you can add any properties that make sense for your interface.

**Examples of flexible interface types:**

```json
{
    "unique-id": "db-connection",
    "host": "database.internal.local",
    "port": 5432
}
```

```json
{
    "unique-id": "api-endpoint",
    "url": "https://api.example.com/v1"
}
```

```json
{
    "unique-id": "message-queue",
    "host": "queue.internal.local",
    "port": 5672,
    "virtual-host": "/prod"
}
```

```json
{
    "unique-id": "web-frontend",
    "hostname": "app.example.com"
}
```

**url-interface:**

```json
{
    "unique-id": "webhook-endpoint",
    "url": "https://api.external.com/webhook/events"
}
```

**oauth2-audience-interface:**

```json
{
    "unique-id": "oauth-protected-api",
    "audiences": ["trading-api", "settlement-service"]
}
```

**container-image-interface:**

```json
{
    "unique-id": "service-container",
    "image": "trading-api:v2.3.1"
}
```

**path-interface:**

```json
{
    "unique-id": "file-path",
    "path": "/data/trading/reports"
}
```

**port-interface:**

```json
{
    "unique-id": "service-port",
    "port": 8080
}
```

## Interface Selection Guide

Use **interface-definition** when:

- Complex protocol configuration needed
- External schema references required
- Standardization across teams

Use **interface-type** when:

- Simple connection requirements
- Basic endpoint references
- Testing or examples (avoids URL validation)

## Validation Rules

1. Choose exactly ONE approach per interface
2. Include all required properties for chosen type
3. Port values must be integers, not strings
4. URLs must be valid format
5. No additional properties beyond those defined

---


### Metadata Creation

# CALM Metadata Creation Guide

## Critical Requirements

🚨 **ALWAYS call the metadata creation tool before adding metadata**

## Official JSON Schema Definition

The complete metadata schema from the FINOS CALM v1.0 specification:

```json
{
    "metadata": {
        "oneOf": [
            {
                "type": "array",
                "items": {
                    "type": "object"
                }
            },
            {
                "type": "object",
                "additionalProperties": true
            }
        ]
    }
}
```

## Metadata Structure Options

Metadata can be defined in TWO ways:

### Option 1: Single Object

```json
"metadata": {
    "version": "1.0.0",
    "owner": "Platform Team",
    "environment": "production"
}
```

### Option 2: Array of Objects

```json
"metadata": [
    {
        "version": "1.0.0",
        "owner": "Platform Team"
    },
    {
        "environment": "production",
        "deployed": "2025-01-15"
    }
]
```

## Metadata Locations

Metadata can be added to:

- Architecture level (top-level)
- Node level
- Relationship level
- Flow level

## Metadata Examples by Level

### Document Level (Architecture)

Metadata at the document level describes the overall architecture:

```json
{
    "calm-version": "1.0.0",
    "architecture-version": "1.0.0",
    "metadata": {
        "title": "Trading Platform Architecture",
        "version": "2.1.0",
        "created": "2025-01-15T10:00:00Z",
        "last-updated": "2025-09-22T14:30:00Z",
        "owner": "Platform Architecture Team",
        "business-domain": "Capital Markets",
        "compliance": ["SOX", "FINRA", "GDPR"],
        "environment": "production",
        "review-cycle": "quarterly",
        "next-review": "2025-12-15"
    },
    "nodes": [...],
    "relationships": [...]
}
```

### Node Level

Metadata for individual components/services:

```json
{
    "unique-id": "trading-api-service",
    "node-type": "service",
    "name": "Trading API Service",
    "description": "Core trading operations API",
    "metadata": {
        "version": "3.2.1",
        "owner": "Trading Team",
        "runtime": "Java 17",
        "framework": "Spring Boot 3.1",
        "deployed-on": "Kubernetes",
        "namespace": "trading-prod",
        "replicas": 5,
        "cpu-request": "1000m",
        "memory-request": "2Gi",
        "cpu-limit": "2000m",
        "memory-limit": "4Gi",
        "health-check": "/actuator/health",
        "metrics-endpoint": "/actuator/prometheus",
        "log-level": "INFO",
        "business-criticality": "high",
        "data-classification": "confidential",
        "last-deployed": "2025-09-20T08:15:00Z",
        "deployment-strategy": "rolling-update"
    },
    "interfaces": [...]
}
```

### Relationship Level

Metadata for connections between components:

```json
{
    "unique-id": "api-to-database-connection",
    "relationship-type": "connects",
    "from": "trading-api-service",
    "to": "trading-database",
    "description": "Trading API connects to primary database",
    "metadata": {
        "protocol": "TCP/PostgreSQL",
        "port": 5432,
        "connection-pool-size": 20,
        "connection-timeout": "30s",
        "idle-timeout": "10m",
        "max-lifetime": "30m",
        "ssl-enabled": true,
        "ssl-mode": "require",
        "monitoring": "connection-pool-metrics",
        "failover": "read-replica-available",
        "backup-strategy": "daily-snapshots",
        "performance-sla": "< 100ms p95",
        "established": "2025-01-15T10:00:00Z",
        "last-tested": "2025-09-22T06:00:00Z"
    }
}
```

### Flow Level

Metadata for data/process flows:

```json
{
    "unique-id": "trade-execution-flow",
    "description": "End-to-end trade execution process",
    "metadata": [
        {
            "business-process": "Trade Execution",
            "owner": "Trading Operations",
            "sla": "< 500ms end-to-end",
            "throughput": "10,000 trades/second peak",
            "availability": "99.99%",
            "recovery-time": "< 30 seconds"
        },
        {
            "monitoring": {
                "metrics": ["latency", "throughput", "error-rate"],
                "alerts": ["high-latency", "failed-trades", "circuit-breaker"],
                "dashboards": ["trading-overview", "performance-metrics"]
            }
        },
        {
            "compliance": {
                "audit-trail": "required",
                "data-retention": "7 years",
                "encryption": "AES-256",
                "access-controls": "RBAC",
                "regulations": ["MiFID II", "FINRA", "SOX"]
            }
        }
    ],
    "steps": [...]
}
```

## Common Use Cases

**Operational Information (Single Object):**

```json
"metadata": {
    "version": "2.3.1",
    "owner": "API Team",
    "runtime": "Java 17",
    "deployed-on": "Kubernetes",
    "replicas": 3,
    "last-deployed": "2025-06-20T14:30:00Z"
}
```

**Compliance & Governance (Single Object):**

```json
"metadata": {
    "compliance": "SOX, FINRA",
    "data-classification": "Confidential",
    "last-reviewed": "2025-06-15",
    "business-owner": "Trading Operations",
    "criticality": "high"
}
```

**Infrastructure Details (Array Format):**

```json
"metadata": [
    {
        "infrastructure": {
            "cpu-limit": "2000m",
            "memory-limit": "4Gi",
            "health-check": "/actuator/health"
        }
    },
    {
        "monitoring": {
            "system": "Prometheus + Grafana",
            "logging": "ELK Stack"
        }
    }
]
```

## Validation Rules

1. Can use either format:
    - Single object: `"metadata": { ... }`
    - Array of objects: `"metadata": [{ ... }, { ... }]`
2. Single object allows any properties (`additionalProperties: true`)
3. Array items must be objects: `{}`
4. No restrictions on object properties or structure
5. Empty objects/arrays are valid: `"metadata": {}` or `"metadata": []`

## Best Practices

- Use single object format for simple, flat metadata
- Use array format when grouping related metadata logically
- Use consistent naming conventions
- Include timestamps in ISO 8601 format
- Consider automation and tooling consumption
- Validate against CALM schema

---


### Node Creation

# CALM Node Creation Guide

## Critical Requirements

⚠️ **ALWAYS call the node creation tool before creating any nodes**
⚠️ **ALWAYS call the interface creation tool before adding interfaces to nodes**

## What Are Nodes?

Nodes represent the "boxes" in a typical architecture diagram and are the fundamental building blocks of any CALM architecture. They provide several key capabilities:

- **Multi-Level Representation**: Nodes can represent an architecture at different levels of fidelity. For example, one node could represent an entire system, while other nodes may represent the individual services, databases, and components that make up that system.

- **Functional Interfaces**: Interfaces can be added to nodes to expose the functions and capabilities that a given node offers to other parts of the architecture.

- **Non-Functional Requirements**: Controls can be added to nodes to specify non-functional requirements such as security policies, compliance controls, and operational constraints.

- **Flexible Granularity**: The level of detail you choose for nodes depends on your architectural modeling needs - from high-level system boundaries down to individual microservices and infrastructure components.

## Official JSON Schema Definition

The complete node schema from the FINOS CALM v1.0 specification:

```json
{
    "node": {
        "type": "object",
        "properties": {
            "unique-id": {
                "type": "string"
            },
            "node-type": {
                "$ref": "#/defs/node-type-definition"
            },
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "details": {
                "type": "object",
                "properties": {
                    "detailed-architecture": {
                        "type": "string"
                    },
                    "required-pattern": {
                        "type": "string"
                    }
                },
                "additionalProperties": false
            },
            "interfaces": {
                "type": "array",
                "items": {
                    "anyOf": [
                        { "$ref": "interface.json#/defs/interface-definition" },
                        { "$ref": "interface.json#/defs/interface-type" }
                    ]
                }
            },
            "controls": {
                "$ref": "control.json#/defs/controls"
            },
            "metadata": {
                "$ref": "#/defs/metadata"
            }
        },
        "required": ["unique-id", "node-type", "name", "description"],
        "additionalProperties": true
    },
    "node-type-definition": {
        "anyOf": [
            {
                "enum": [
                    "actor",
                    "ecosystem",
                    "system",
                    "service",
                    "database",
                    "network",
                    "ldap",
                    "webclient",
                    "data-asset"
                ]
            },
            {
                "type": "string"
            }
        ]
    },
    "metadata": {
        "oneOf": [
            {
                "type": "array",
                "items": {
                    "type": "object"
                }
            },
            {
                "type": "object",
                "additionalProperties": true
            }
        ]
    }
}
```

## Required Properties

Every node MUST have:

- `unique-id` (string)
- `node-type` (from allowed enum values)
- `name` (string)
- `description` (string)

## Node Types

Available node-type values:

- `actor` - External systems or users
- `ecosystem` - High-level system boundaries
- `system` - Business systems
- `service` - Microservices or APIs
- `database` - Data storage systems
- `network` - Network infrastructure
- `ldap` - Directory services
- `webclient` - Web applications or frontends
- `data-asset` - Data files or datasets

**Note**: The schema also allows custom string values beyond the standard enum.

## Optional Properties

- `interfaces` - Communication endpoints (array) - Use interface creation tool for details
- `details` - Object with `detailed-architecture` or `required-pattern` properties
- `controls` - Compliance controls (see control creation tool)
- `metadata` - Additional information (see metadata creation tool for details)

## Details Property Structure

The `details` property follows this exact schema:

```json
{
    "details": {
        "type": "object",
        "properties": {
            "detailed-architecture": {
                "type": "string"
            },
            "required-pattern": {
                "type": "string"
            }
        },
        "additionalProperties": false
    }
}
```

**Important**:

- The details object allows NO additional properties beyond `detailed-architecture` and `required-pattern`
- `detailed-architecture`: Fully qualified address/URL to a detailed architecture document (use `.architecture.json` suffix)
- `required-pattern`: Fully qualified address/URL to a required pattern document (use `.pattern.json` suffix)

## Metadata Schema Rules

Critical: Metadata can be either an array OR an object (see metadata creation tool for complete guidance):

```json
{
    "metadata": {
        "oneOf": [
            {
                "type": "array",
                "items": {
                    "type": "object"
                }
            },
            {
                "type": "object",
                "additionalProperties": true
            }
        ]
    }
}
```

## Example Nodes

### Basic Service Node

```json
{
    "unique-id": "trading-api",
    "node-type": "service",
    "name": "Trading API Service",
    "description": "Core API for processing trading requests",
    "metadata": [
        {
            "version": "2.1.0",
            "owner": "Trading Team",
            "runtime": "Java 17"
        }
    ]
}
```

### Node with Details

```json
{
    "unique-id": "payment-system",
    "node-type": "system",
    "name": "Payment Processing System",
    "description": "Handles all payment transactions and reconciliation",
    "details": {
        "detailed-architecture": "https://calm.company.com/architectures/payment-system-v2.architecture.json",
        "required-pattern": "https://calm.company.com/patterns/pci-security.pattern.json"
    },
    "metadata": {
        "compliance": "PCI-DSS Level 1",
        "criticality": "high"
    }
}
```

### Database Node

```json
{
    "unique-id": "user-database",
    "node-type": "database",
    "name": "User Database",
    "description": "Primary database storing user account information"
}
```

## Schema Validation Rules

1. **Required Properties**: Must include `unique-id`, `node-type`, `name`, `description`
2. **Node Type**: Must be from enum or custom string
3. **Details Object**: Only allows `detailed-architecture` and `required-pattern` properties
4. **Metadata**: Can be array of objects OR single object (see metadata creation tool)
5. **Additional Properties**: Schema allows additional properties at node level (`"additionalProperties": true`)
6. **Interfaces**: Must follow interface schema (use interface creation tool)

## Key Reminders

- Always use the node creation tool before creating nodes
- Reference the interface creation tool for interface details
- Reference the metadata creation tool for metadata structure guidance
- The schema is authoritative - follow it exactly
- Node unique-ids must be unique across the entire architecture

---


### Pattern Creation

# CALM Pattern Creation Guide

## Critical Requirements

🚨 **ALWAYS call the pattern creation tool before creating any patterns**

## Overview

Patterns in CALM are JSON schemas that provide reusable, instantiable architecture templates. They define repeatable architectural solutions with configurable options that can be generated using the `calm generate` command.

## Pattern Structure

A CALM pattern is a JSON schema that:

- Extends the base CALM architecture schema
- Defines constrained node and relationship options using JSON schema constructs
- Provides optionality through `anyOf`, `oneOf`, and other schema features
- Can be instantiated to create concrete architectures

## Basic Pattern Schema

```json
{
    "$schema": "https://calm.finos.org/release/1.1/meta/calm.json",
    "$id": "https://your-domain.com/patterns/my-pattern.json",
    "title": "My Architecture Pattern",
    "type": "object",
    "properties": {
        "nodes": {
            "type": "array",
            "maxItems": 3,
            "prefixItems": [
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                    "type": "object",
                    "properties": {
                        "unique-id": {
                            "const": "frontend"
                        },
                        "name": {
                            "const": "Frontend Application"
                        },
                        "node-type": {
                            "const": "webclient"
                        }
                    }
                }
            ]
        },
        "relationships": {
            "type": "array",
            "minItems": 1,
            "maxItems": 2
        }
    },
    "required": ["nodes", "relationships"]
}
```

## Providing Options with anyOf/oneOf

Patterns use JSON schema constructs to provide choices and options:

### Node Options with anyOf

```json
{
    "properties": {
        "nodes": {
            "type": "array",
            "maxItems": 2,
            "prefixItems": [
                {
                    "anyOf": [
                        {
                            "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                            "type": "object",
                            "properties": {
                                "unique-id": { "const": "postgres-db" },
                                "name": { "const": "PostgreSQL Database" },
                                "node-type": { "const": "database" }
                            }
                        },
                        {
                            "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                            "type": "object",
                            "properties": {
                                "unique-id": { "const": "mysql-db" },
                                "name": { "const": "MySQL Database" },
                                "node-type": { "const": "database" }
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```

### Relationship Options with Decision Points

```json
{
    "relationships": {
        "type": "array",
        "prefixItems": [
            {
                "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/relationship",
                "type": "object",
                "properties": {
                    "unique-id": { "const": "database-choice" },
                    "description": {
                        "const": "Which database does your application use?"
                    },
                    "relationship-type": {
                        "type": "object",
                        "properties": {
                            "options": {
                                "type": "array",
                                "prefixItems": [
                                    {
                                        "oneOf": [
                                            {
                                                "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/decision",
                                                "type": "object",
                                                "properties": {
                                                    "description": {
                                                        "const": "Use PostgreSQL"
                                                    },
                                                    "nodes": {
                                                        "const": ["postgres-db"]
                                                    },
                                                    "relationships": {
                                                        "const": [
                                                            "app-to-postgres"
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/decision",
                                                "type": "object",
                                                "properties": {
                                                    "description": {
                                                        "const": "Use MySQL"
                                                    },
                                                    "nodes": {
                                                        "const": ["mysql-db"]
                                                    },
                                                    "relationships": {
                                                        "const": [
                                                            "app-to-mysql"
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]
    }
}
```

## Complete Pattern Example

**Conference Signup Pattern (Based on Real Example):**

```json
{
    "$schema": "https://calm.finos.org/release/1.1/meta/calm.json",
    "$id": "https://patterns.company.com/conference-signup.pattern.json",
    "title": "Conference Signup Pattern",
    "description": "A reusable architecture pattern for conference signup systems with Kubernetes deployment",
    "type": "object",
    "properties": {
        "nodes": {
            "type": "array",
            "minItems": 4,
            "maxItems": 4,
            "prefixItems": [
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                    "type": "object",
                    "properties": {
                        "unique-id": { "const": "frontend" },
                        "name": { "const": "Web Frontend" },
                        "node-type": { "const": "webclient" },
                        "description": { "type": "string" },
                        "interfaces": {
                            "type": "array",
                            "minItems": 1,
                            "maxItems": 1,
                            "prefixItems": [
                                {
                                    "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/url-interface",
                                    "properties": {
                                        "unique-id": { "const": "frontend-url" }
                                    }
                                }
                            ]
                        }
                    },
                    "required": ["description"]
                },
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                    "type": "object",
                    "properties": {
                        "unique-id": { "const": "api-service" },
                        "name": { "const": "Registration API" },
                        "node-type": { "const": "service" },
                        "description": { "type": "string" },
                        "interfaces": {
                            "type": "array",
                            "minItems": 2,
                            "maxItems": 2,
                            "prefixItems": [
                                {
                                    "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/container-image-interface",
                                    "properties": {
                                        "unique-id": { "const": "api-image" }
                                    }
                                },
                                {
                                    "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/port-interface",
                                    "properties": {
                                        "unique-id": { "const": "api-port" }
                                    }
                                }
                            ]
                        }
                    },
                    "required": ["description"]
                },
                {
                    "anyOf": [
                        {
                            "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                            "type": "object",
                            "properties": {
                                "unique-id": { "const": "postgres-db" },
                                "name": { "const": "PostgreSQL Database" },
                                "node-type": { "const": "database" },
                                "interfaces": {
                                    "type": "array",
                                    "minItems": 2,
                                    "maxItems": 2,
                                    "prefixItems": [
                                        {
                                            "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/container-image-interface",
                                            "properties": {
                                                "unique-id": {
                                                    "const": "postgres-image"
                                                }
                                            }
                                        },
                                        {
                                            "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/port-interface",
                                            "properties": {
                                                "unique-id": {
                                                    "const": "postgres-port"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                            "type": "object",
                            "properties": {
                                "unique-id": { "const": "mysql-db" },
                                "name": { "const": "MySQL Database" },
                                "node-type": { "const": "database" },
                                "interfaces": {
                                    "type": "array",
                                    "minItems": 2,
                                    "maxItems": 2,
                                    "prefixItems": [
                                        {
                                            "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/container-image-interface",
                                            "properties": {
                                                "unique-id": {
                                                    "const": "mysql-image"
                                                }
                                            }
                                        },
                                        {
                                            "$ref": "https://calm.finos.org/release/1.1/meta/interface.json#/defs/port-interface",
                                            "properties": {
                                                "unique-id": {
                                                    "const": "mysql-port"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node",
                    "type": "object",
                    "properties": {
                        "unique-id": { "const": "k8s-cluster" },
                        "name": { "const": "Kubernetes Cluster" },
                        "node-type": { "const": "system" },
                        "description": { "type": "string" }
                    },
                    "required": ["description"]
                }
            ]
        },
        "relationships": {
            "type": "array",
            "minItems": 3,
            "maxItems": 3,
            "prefixItems": [
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/relationship",
                    "type": "object",
                    "properties": {
                        "unique-id": { "const": "frontend-to-api" },
                        "description": { "type": "string" },
                        "protocol": { "const": "HTTPS" },
                        "relationship-type": {
                            "const": {
                                "connects": {
                                    "source": { "node": "frontend" },
                                    "destination": { "node": "api-service" }
                                }
                            }
                        }
                    },
                    "required": ["description"]
                },
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/relationship",
                    "type": "object",
                    "properties": {
                        "unique-id": { "const": "api-to-database" },
                        "description": { "type": "string" },
                        "protocol": { "const": "JDBC" },
                        "relationship-type": {
                            "const": {
                                "connects": {
                                    "source": { "node": "api-service" },
                                    "destination": { "node": "postgres-db" }
                                }
                            }
                        }
                    },
                    "required": ["description"]
                },
                {
                    "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/relationship",
                    "properties": {
                        "unique-id": { "const": "deployed-in-k8s" },
                        "description": { "type": "string" },
                        "relationship-type": {
                            "const": {
                                "deployed-in": {
                                    "container": "k8s-cluster",
                                    "nodes": ["api-service", "postgres-db"]
                                }
                            }
                        }
                    },
                    "required": ["description"]
                }
            ]
        },
        "metadata": {
            "type": "array",
            "minItems": 1,
            "maxItems": 1,
            "prefixItems": [
                {
                    "type": "object",
                    "properties": {
                        "kubernetes": {
                            "type": "object",
                            "properties": {
                                "namespace": { "const": "conference" }
                            },
                            "required": ["namespace"]
                        }
                    },
                    "required": ["kubernetes"]
                }
            ]
        }
    },
    "required": ["nodes", "relationships", "metadata"]
}
```

## Key Pattern Features

Based on real CALM patterns, patterns should include:

### Understanding const vs User-Fillable Fields

🚨 **CRITICAL**: Know when to use `const` vs when to leave fields open:

- **Use `const`** for **structural identifiers** that define the pattern:
  - `unique-id` - identifies specific nodes/relationships in the pattern
  - `node-type` - defines what kind of component (service, database, etc.)
  - `relationship-type` - defines the connection structure
  - `name` - fixed component names that define the pattern

- **DO NOT use `const`** for **user-fillable fields**:
  - `description` - users should provide their own descriptions
  - Custom fields from Standards (costCenter, owner, dataClassification, etc.)
  - Any field where users need to provide their own values

**Wrong - using const for description:**
```json
{
    "properties": {
        "unique-id": { "const": "api-service" },
        "description": { "const": "{{ PLACEHOLDER }}" }  // ❌ WRONG
    }
}
```

**Correct - only const for identifiers:**
```json
{
    "properties": {
        "unique-id": { "const": "api-service" },
        "description": { "type": "string" }  // ✅ User fills this in
    },
    "required": ["description"]  // Enforce it's provided
}
```

### Complete Node Definitions

- **Interfaces**: Define specific interface types (url-interface, container-image-interface, port-interface, etc.)
- **Constraints**: Use `const` for structural identifiers, `anyOf` for choices
- **Array constraints**: Use `minItems`, `maxItems`, and `prefixItems`

### Detailed Relationships

- **Protocol specification**: Include `protocol` property with values like "HTTPS", "JDBC", "mTLS"
- **Relationship types**: Use `connects` and `deployed-in` appropriately
- **Required fields**: Always include `"required": ["description"]`

### Metadata Constraints

- **Structured metadata**: Define specific metadata schema constraints
- **Deployment information**: Include environment-specific details (e.g., Kubernetes namespace)

### Optional: Controls

Patterns can include security controls on relationships:

```json
"controls": {
    "$ref": "https://calm.finos.org/release/1.1/meta/control.json#/defs/controls",
    "properties": {
        "security": {
            "type": "object",
            "properties": {
                "description": {
                    "const": "Security controls for this connection"
                },
                "requirements": {
                    "type": "array",
                    "minItems": 1,
                    "maxItems": 1,
                    "prefixItems": [
                        {
                            "$ref": "https://calm.finos.org/release/1.1/meta/control.json#/defs/control-detail",
                            "properties": {
                                "requirement-url": {
                                    "const": "https://schemas.company.com/security/connection-security.json"
                                },
                                "config-url": {
                                    "const": "https://configs.company.com/security/https-config.json"
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}
```

### Optional: Flows

Patterns can also constrain business flows (though not shown in the basic examples).

## Important Schema Details

### Interface References

Always use specific interface schema references:

- `url-interface` for web endpoints
- `container-image-interface` for Docker images
- `port-interface` for network ports
- `host-port-interface` for host/port combinations

### Relationship Types

- `connects`: For service-to-service communications
- `deployed-in`: For deployment relationships (container/nodes structure)

### Array Handling

- Use `prefixItems` to define specific array positions
- Use `minItems`/`maxItems` to constrain array sizes
- Each array item should reference base schema + add constraints

## Using Patterns with calm generate

Patterns are instantiated using the `calm generate` command:

```bash
# Generate architecture from pattern
calm generate --pattern https://patterns.company.com/conference-signup.pattern.json

# Generate with specific options
calm generate --pattern conference-signup --output my-architecture.json
```

The CLI will prompt for choices when encountering `anyOf`/`oneOf` options, or you can provide a configuration file.

## JSON Schema Constructs Reference

### Constraint Properties

- `const` - Fixed values that cannot be changed
- `enum` - List of allowed values
- `minItems`/`maxItems` - Array size constraints
- `prefixItems` - Define specific array items

### Option Constructs

- `anyOf` - One or more options can be true
- `oneOf` - Exactly one option must be true
- `allOf` - All conditions must be true

### Schema References

- `$ref` - Reference base CALM schema definitions
- Always reference `https://calm.finos.org/release/1.1/meta/core.json#/defs/node` for nodes
- Always reference `https://calm.finos.org/release/1.1/meta/core.json#/defs/relationship` for relationships
- Reference specific interface schemas from `https://calm.finos.org/release/1.1/meta/interface.json#/defs/`

## Validation Rules

1. Pattern must be a valid JSON schema extending CALM architecture schema
2. Must reference base CALM schema: `"$schema": "https://calm.finos.org/release/1.1/meta/calm.json"`
3. Node definitions must use `$ref` to core node schema
4. Relationship definitions must use `$ref` to core relationship schema
5. Use `const` for fixed values, `anyOf`/`oneOf` for options
6. All constraint properties must be valid JSON schema constructs
7. Pattern should be testable with `calm validate -p <pattern-file>`

## Best Practices

- Create patterns for commonly repeated architecture components
- Use meaningful constraint names and descriptions
- Provide clear choices in `anyOf`/`oneOf` constructs
- Use `const` values for fixed architectural decisions
- Reference external schemas for complex interface definitions
- Test patterns thoroughly before publishing
- Version patterns using semantic versioning in `$id`
- Document pattern usage and options clearly
- Consider composability when designing pattern choices

## Pattern Testing

Test patterns before publishing:

```bash
# Validate pattern schema
calm validate -p my-pattern.json

# Generate test architecture from pattern
calm generate -p my-pattern.json -o test-arch.json

# Validate architecture against pattern
calm validate -p my-pattern.json -a test-arch.json
```

> **Note:** See **calm-cli-instructions.md** for complete CLI usage, validation modes, and options.

---


### Relationship Creation

# CALM Relationship Creation Guide

## Critical Requirements

⚠️ **ALWAYS call the relationship creation tool before creating any relationships**

## Overview

Relationships connect nodes in your architecture and define how they interact or are organized.

## Official JSON Schema Definition

The complete relationship schema from the FINOS CALM v1.0 specification:

```json
{
    "relationship": {
        "type": "object",
        "properties": {
            "unique-id": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "relationship-type": {
                "type": "object",
                "properties": {
                    "interacts": {
                        "$ref": "#/defs/interacts-type"
                    },
                    "connects": {
                        "$ref": "#/defs/connects-type"
                    },
                    "deployed-in": {
                        "$ref": "#/defs/deployed-in-type"
                    },
                    "composed-of": {
                        "$ref": "#/defs/composed-of-type"
                    },
                    "options": {
                        "$ref": "#/defs/option-type"
                    }
                },
                "oneOf": [
                    {
                        "required": ["deployed-in"]
                    },
                    {
                        "required": ["composed-of"]
                    },
                    {
                        "required": ["interacts"]
                    },
                    {
                        "required": ["connects"]
                    },
                    {
                        "required": ["options"]
                    }
                ]
            },
            "protocol": {
                "$ref": "#/defs/protocol"
            },
            "metadata": {
                "$ref": "#/defs/metadata"
            },
            "controls": {
                "$ref": "control.json#/defs/controls"
            }
        },
        "required": ["unique-id", "relationship-type"],
        "additionalProperties": true
    },
    "protocol": {
        "enum": [
            "HTTP",
            "HTTPS",
            "FTP",
            "SFTP",
            "JDBC",
            "WebSocket",
            "SocketIO",
            "LDAP",
            "AMQP",
            "TLS",
            "mTLS",
            "TCP"
        ]
    },
    "interacts-type": {
        "type": "object",
        "properties": {
            "actor": {
                "type": "string"
            },
            "nodes": {
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "string"
                }
            }
        },
        "required": ["actor", "nodes"]
    },
    "connects-type": {
        "type": "object",
        "properties": {
            "source": {
                "$ref": "interface.json#/defs/node-interface"
            },
            "destination": {
                "$ref": "interface.json#/defs/node-interface"
            }
        },
        "required": ["source", "destination"]
    },
    "deployed-in-type": {
        "type": "object",
        "properties": {
            "container": {
                "type": "string"
            },
            "nodes": {
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "string"
                }
            }
        },
        "required": ["container", "nodes"]
    },
    "composed-of-type": {
        "type": "object",
        "properties": {
            "container": {
                "type": "string"
            },
            "nodes": {
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "string"
                }
            }
        },
        "required": ["container", "nodes"]
    }
}
```

## Required Properties

Every relationship MUST have:

- `unique-id` (string)
- `relationship-type` (object with exactly one type using oneOf constraint)



## Relationship Types

The relationship-type must contain exactly ONE of these types (enforced by oneOf constraint):

## Usage Patterns

- **connects**: Use for systematic node-to-node connections (service-to-database, API-to-service, etc.)
- **interacts**: Use for actor-to-system interactions (user interacts with application, external system interacts with API)
- **deployed-in**: Use for deployment containment (service deployed in container, container deployed in cluster)
- **composed-of**: Use for logical composition (system composed of microservices, application composed of modules)

## Descriptions

**Note**: The schema shows `description` is optional, not required as commonly assumed.  However it is highly recommended to include
them as they convey rich information about how the overall architecture actually works.

Descriptions should be concise but clarify the _intent_ of the relationship.  The preferred style is to omit the source and
destination node names, but be very clear as to the directionality.  Examples:
- "Reads customer information from and writes to" (e.g. a service querying a database)
- "Sends traansactions to" (e.g. one service sending to another via a message queue)
- "Reviews trade summaries using" (e.g. a human interacting with a UI)

### Available Protocol Values

When using the optional `protocol` property, it must be from this enum:
`HTTP`, `HTTPS`, `FTP`, `SFTP`, `JDBC`, `WebSocket`, `SocketIO`, `LDAP`, `AMQP`, `TLS`, `mTLS`, `TCP`

### 1. connects

**Purpose**: Point-to-point connections between systematic nodes (services, systems, databases, etc.)

```json
"relationship-type": {
  "connects": {
    "source": {
      "node": "conference-website",
      "interfaces": ["conference-website-url"]
    },
    "destination": {
      "node": "load-balancer",
      "interfaces": ["load-balancer-host-port"]
    }
  }
}
```

### 2. interacts

**Purpose**: Business-level interactions between actors and systems

```json
"relationship-type": {
  "interacts": {
    "actor": "user",
    "nodes": ["conference-website", "attendees"]
  }
}
```

### 3. deployed-in

Containment relationships:

```json
"relationship-type": {
  "deployed-in": {
    "container": "k8s-cluster",
    "nodes": ["load-balancer", "attendees", "attendees-store"]
  }
}
```

### 4. composed-of

Composition relationships:

```json
"relationship-type": {
  "composed-of": {
    "container": "conference-system",
    "nodes": ["conference-website", "attendees", "attendees-store"]
  }
}
```

## Optional Properties

- `description` - Human-readable description (string)
- `protocol` - Communication protocol from allowed enum values above
- `metadata` - Additional information (see metadata creation tool for details)
- `controls` - Compliance controls (see control creation tool for details)

## Example Relationship

```json
{
    "unique-id": "attendees-attendees-store",
    "description": "Stores and requests attendee details in",
    "relationship-type": {
        "connects": {
            "source": {
                "node": "attendees"
            },
            "destination": {
                "node": "attendees-store"
            }
        }
    },
    "protocol": "JDBC"
}
```

## Schema Validation Rules

1. **Required Properties**: Must include `unique-id` and `relationship-type`
2. **OneOf Constraint**: relationship-type must contain exactly ONE of: `interacts`, `connects`, `deployed-in`, `composed-of`, or `options`
3. **Node References**: Must reference existing node unique-id values
4. **Interface References**: Must exist on the referenced node (for connects type)
5. **Protocol Enum**: Must be from the allowed protocol values if specified
6. **Array Constraints**: `nodes` arrays must have minimum 1 item
7. **Additional Properties**: Schema allows additional properties at relationship level (`"additionalProperties": true`)
8. **Metadata**: Can be array or object (see metadata creation tool)
9. **Controls**: Must follow control schema (see control creation tool)

---


### Standards Creation

# CALM Standards Creation Guide

## Critical Requirements

⚠️ **ALWAYS call the standards creation tool before creating any Standards**
⚠️ **Standards must follow JSON Schema 2020-12 specification**
⚠️ **Standards compose with core CALM schemas using `$ref` and `allOf`**

## What are Standards?

Standards are JSON Schema 2020-12 documents that extend core CALM components with organization-specific or domain-specific properties.
They enable consistent requirements across CALM architectures while integrating seamlessly with existing JSON Schema validation.

**Key Capabilities:**

- **Organization Extensions**: Add company-specific properties to nodes, interfaces, relationships
- **Compliance Integration**: Most controls use Standards to define requirements and specifications
- **Community Sharing**: FINOS and industry groups can create reusable Standards
- **Native Validation**: Works with standard JSON Schema validation in `calm validate`

## JSON Schema 2020-12 Structure

All Standards must follow this base structure:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "[Descriptive Title]",
  "type": "object",
  "properties": {
    // Your additional properties here
  },
  "required": [/* required properties */],
  "additionalProperties": false
}
```

## Target CALM Components

Standards commonly extend these core CALM components:

### Nodes
- Company requirements (cost centers, ownership, environments)
- Infrastructure standards (cloud specs, resource limits)
- Compliance classifications (security levels, regulatory tags)

### Interfaces  
- Authentication standards (OAuth, API keys)
- Protocol specifications (versions, encoding)
- Performance requirements (rate limits, timeouts)

### Relationships
- Approval workflows (required approvals)
- Security policies (network segmentation, data flow)
- Monitoring requirements (logging, alerting)

### Control Requirements
- Compliance frameworks (NIST, ISO 27001, SOC 2)
- Organizational policies (internal security, operations)
- Audit standards (evidence, documentation)

## Schema Composition Patterns

### Pure Standard (No Core Reference)

For defining reusable schema fragments:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "NIST Document Standard",
  "type": "object",
  "properties": {
    "documentNumber": {
      "type": "string",
      "description": "Official NIST document number, e.g., 'NIST SP 800-207'"
    },
    "title": {
      "type": "string",
      "description": "Full title of the NIST document"
    },
    "status": {
      "type": "string",
      "enum": ["Final", "Draft", "Superseded", "Withdrawn"],
      "description": "Current status of the document"
    },
    "seriesName": {
      "type": "string",
      "description": "NIST publication series name"
    }
  },
  "required": ["documentNumber", "title", "status", "seriesName"],
  "additionalProperties": false
}
```

### Composed with Core CALM Schema

For extending CALM components directly:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Company Node Standard",
  "allOf": [
    { "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node" },
    {
      "type": "object",
      "properties": {
        "costCenter": {
          "type": "string",
          "pattern": "^CC-[0-9]{4}$",
          "description": "Company cost center code"
        },
        "owner": {
          "type": "string",
          "description": "Team or individual responsible"
        },
        "environment": {
          "type": "string",
          "enum": ["development", "staging", "production"]
        }
      },
      "required": ["costCenter", "owner"]
    }
  ]
}
```

## Core CALM Schema References

Common `$ref` patterns for extending CALM components:

- **Nodes**: `https://calm.finos.org/release/1.1/meta/core.json#/defs/node`
- **Interfaces**: `https://calm.finos.org/release/1.1/meta/core.json#/defs/interface`
- **Relationships**: `https://calm.finos.org/release/1.1/meta/core.json#/defs/relationship`
- **Controls**: `https://calm.finos.org/release/1.1/meta/core.json#/defs/control`

**Note**: Exact URLs may vary based on CALM schema hosting.
Always verify current schema locations.

## Integration with Controls

Most controls use Standards indirectly through their requirement files.
This creates consistency across compliance frameworks:

**Control Definition:**
```json
{
  "nist-access-control": {
    "description": "NIST access control requirements",
    "requirements": [
      {
        "requirement-url": "https://requirements.company.com/nist-ac2.json",
        "config": { /* configuration data */ }
      }
    ]
  }
}
```

**Requirement File Using Standard:**
```json
{
  "$schema": "https://company.com/standards/nist-document.json",
  "documentNumber": "NIST SP 800-53",
  "controlId": "AC-2",
  "title": "Access Control Requirements"
}
```

The requirement file uses the Standard as its schema, ensuring all NIST requirements follow the same structure.

## Validation Integration

Standards work seamlessly with `calm validate`:

1. **Schema Resolution**: Validator resolves `$ref` to Standards automatically
2. **Composition**: Uses `allOf` to combine core CALM and Standard schemas
3. **Validation**: Applies standard JSON Schema validation
4. **Error Reporting**: Clear messages indicate Standard requirement violations

### Local Development with URL Mapping

When developing Standards locally before publishing to a public URL, use the `--url-to-local-file-mapping` option to map canonical URLs to local files:

```bash
# Create a mapping file (url-mapping.json)
{
  "https://company.com/standards/company-node.json": "standards/company-node.json"
}

# Validate using the mapping
calm validate -p pattern.json -a architecture.json -u url-mapping.json
```

This allows patterns and architectures to reference Standards via their canonical URLs while the actual files exist locally. See **calm-cli-instructions.md** for complete URL mapping documentation.

## Common Standard Examples

### Company Node Requirements

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Company Node Standard",
  "type": "object",
  "properties": {
    "costCenter": {
      "type": "string",
      "pattern": "^CC-[0-9]{4}$"
    },
    "owner": {
      "type": "string"
    },
    "criticality": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"]
    }
  },
  "required": ["costCenter", "owner"]
}
```

### Interface Authentication Standard

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "OAuth Interface Standard",
  "type": "object",
  "properties": {
    "authProvider": {
      "type": "string",
      "enum": ["company-sso", "external-oauth"]
    },
    "scopes": {
      "type": "array",
      "items": { "type": "string" }
    },
    "tokenLifetime": {
      "type": "integer",
      "minimum": 300,
      "maximum": 3600
    }
  },
  "required": ["authProvider", "scopes"]
}
```

### Security Control Framework

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Security Control Standard",
  "type": "object",
  "properties": {
    "framework": {
      "type": "string",
      "enum": ["NIST", "ISO27001", "SOC2"]
    },
    "controlId": {
      "type": "string"
    },
    "implementationLevel": {
      "type": "string",
      "enum": ["basic", "standard", "advanced"]
    },
    "evidenceRequired": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["framework", "controlId"]
}
```

## Usage in CALM Architectures

### Using Standards in Component Definitions

```json
{
  "nodes": [
    {
      "$ref": "#/defs/company-node"
    }
  ],
  "defs": {
    "company-node": {
      "allOf": [
        { "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node" },
        { "$ref": "https://company.com/standards/company-node.json" }
      ]
    }
  }
}
```

### Multiple Standards Composition

```json
{
  "defs": {
    "enterprise-node": {
      "allOf": [
        { "$ref": "https://calm.finos.org/release/1.1/meta/core.json#/defs/node" },
        { "$ref": "https://company.com/standards/company-node.json" },
        { "$ref": "https://industry.org/standards/security-node.json" }
      ]
    }
  }
}
```

## FINOS Community Standards

The FINOS community creates Standards for common financial services use cases:

- **Regulatory Compliance**: Patterns for financial regulations
- **Risk Management**: Risk assessment and classification standards  
- **Security Frameworks**: Industry security control patterns
- **Integration Patterns**: API and messaging standards

## Validation Rules

1. **Schema Format**: Must be valid JSON Schema 2020-12
2. **Title Required**: Every Standard must have a descriptive title
3. **Property Descriptions**: All properties should include descriptions
4. **No Core Conflicts**: Standard properties must not conflict with core CALM schema
5. **Composition Compatibility**: When using `allOf`, ensure schemas compose correctly
6. **Reference Validity**: All `$ref` URLs must resolve to valid schemas

## Best Practices

### Standard Design
- **Focus Purpose**: Address specific organizational or domain needs
- **Clear Naming**: Make purpose obvious from title (e.g., "Company Node Standard")
- **Document Thoroughly**: Include descriptions for all properties and constraints
- **Version Semantically**: Use semantic versioning for Standard updates
- **Test Validation**: Verify Standards work with `calm validate`

### Schema Composition
- **Use `allOf`**: Cleanly compose Standards with core CALM schemas
- **Avoid Conflicts**: Ensure no property name conflicts with core schema
- **Order Matters**: Place core schema reference first in `allOf` array
- **Validate Composition**: Test that combined schemas validate correctly

### Organizational Adoption
- **Start Simple**: Begin with basic requirements (cost center, owner)
- **Iterate Gradually**: Add complexity as teams become comfortable
- **Document Usage**: Provide clear examples and adoption guides
- **Monitor Compliance**: Use validation to ensure Standards are followed

## Cross-References

- **Control Creation**: See control creation tool for integrating Standards with controls
- **Node Creation**: Reference for extending nodes with Standards
- **Interface Creation**: Guidance for interface-specific Standards
- **Architecture Creation**: How to structure architectures using Standards
- **calm-cli-instructions.md**: Complete CLI usage including validation modes and options

## Key Reminders

- Always use JSON Schema 2020-12 specification
- Most controls will use Standards for their requirements
- Standards compose with core CALM schemas via `$ref` and `allOf`
- Focus on nodes, interfaces, relationships, and control-requirements
- FINOS community will provide reusable Standards for financial services
- Native JSON Schema validation handles Standard enforcement automatically

---


### Calm Cli Instructions

# CALM CLI Instructions

The CALM CLI provides command-line utilities for working with Common Architecture Language Model (CALM) files. This guide summarizes the primary commands and their usage.

## Installation and Help

Install globally via npm:

```shell
npm install -g @finos/calm-cli
```

Run `calm` with no arguments to see the top-level help:

```shell
calm
```

This displays available commands such as `generate`, `validate`, `copilot-chatmode`, `server`, `template`, and `docify`.

## Generate Architectures from Patterns

Create an architecture scaffold from a CALM pattern:

```shell
calm generate -p <pattern-file> [-o <output-file>] [--schema-directory <path>] [--url-to-local-file-mapping <json>] [--verbose]
```

- `-p, --pattern`: Path or URL to the pattern file (required).
- `-o, --output`: Where to write the generated architecture (defaults to `architecture.json`).
- `-s, --schema-directory`: Location of CALM meta schemas (defaults to `../calm/release`).
- `-c, --calm-hub-url`: URL to CALMHub instance for loading remote documents.
- `-u, --url-to-local-file-mapping`: Path to JSON file mapping URLs to local paths (see [URL Mapping](#using---url-to-local-file-mapping)).
- `-v, --verbose`: Enables verbose logging.

Example:

```shell
calm generate -p calm/pattern/api-gateway.json
```

## Validate Architectures and Patterns

Validate CALM architectures and/or patterns. At least one of `-p` (pattern) or `-a` (architecture) must be provided.

```shell
calm validate [-p <pattern-file>] [-a <architecture-file>] [-s <schema-directory>] [-c <calm-hub-url>] [--strict] [-f <format>] [-o <output>] [-v]
```

### Options

| Option | Description |
|--------|-------------|
| `-p, --pattern <file>` | Path or URL to the pattern file |
| `-a, --architecture <file>` | Path or URL to the architecture file |
| `-s, --schema-directory <path>` | Path to directory containing meta schemas |
| `-c, --calm-hub-url <url>` | URL to CALMHub instance for loading remote documents |
| `-u, --url-to-local-file-mapping <path>` | Path to JSON file mapping URLs to local paths (see [URL Mapping](#using---url-to-local-file-mapping)) |
| `--strict` | Treat warnings as failures (exit non-zero) |
| `-f, --format <format>` | Output format: `json` (default), `junit`, or `pretty` |
| `-o, --output <file>` | Write validation output to a file |
| `-v, --verbose` | Enable verbose logging |

### Validation Modes

The validate command operates in three modes depending on which flags are provided:

#### 1. Architecture Only (`-a`)

```shell
calm validate -a my-system.architecture.json
```

Validates the architecture file. If the architecture contains a `$schema` property pointing to a pattern, it will automatically load and validate against that pattern. Otherwise, runs Spectral rules on the architecture structure only.

#### 2. Pattern Only (`-p`)

```shell
calm validate -p my-pattern.json
```

Validates the pattern file by running Spectral rules and compiling it as a JSON schema to verify it is well-formed. Does not validate any architecture.

#### 3. Both Architecture and Pattern (`-a` and `-p`)

```shell
calm validate -p my-pattern.json -a my-system.architecture.json
```

Full validation mode. Runs Spectral rules on both files, then validates the architecture against the pattern as a JSON schema. This is the most comprehensive validation.

### Understanding Output

Validation produces two types of results:

- **`jsonSchemaValidationOutputs`**: Errors from validating architecture against pattern schema
- **`spectralSchemaValidationOutputs`**: Warnings/errors from Spectral linting rules

The command exits with code 1 if errors are found. Warnings do not cause failure unless `--strict` is used.

### Examples

```shell
# Validate architecture against its embedded $schema reference
calm validate -a trading-system.architecture.json

# Validate a pattern is well-formed
calm validate -p api-gateway.pattern.json

# Full validation with explicit pattern
calm validate -p api-gateway.pattern.json -a trading-system.architecture.json

# Strict mode with pretty output
calm validate -a my-arch.json --strict -f pretty

# Output to file in JUnit format (useful for CI)
calm validate -p pattern.json -a arch.json -f junit -o results.xml
```

## Copilot Chatmode Setup

Configure CALM-specific AI assistance inside a repo:

```shell
calm copilot-chatmode [--directory <path>] [--verbose]
```

This generates `.github/chatmodes/CALM.chatmode.md`, enabling GitHub Copilot Chat to use CALM-aware tools (nodes, relationships, interfaces, controls, flows, patterns, metadata).

## CLI Server (Experimental)

Expose CLI functionality over HTTP:

```shell
calm server --schema-directory <path>
```

Endpoints (default `http://127.0.0.1:3000`):

- `GET /health` for health checks
- `POST /calm/validate` with a CALM model payload to validate

## Template Command

Generate arbitrary files from CALM models using Handlebars bundles:

```shell
calm template -a <architecture> -o <output> [--bundle <path> | --template <file> | --template-dir <dir>] [--url-to-local-file-mapping <json>] [--clear-output-directory] [--verbose]
```

Useful for producing documentation, reports, or configs. Template bundles require an `index.json`, transformer implementation, and templates.

## Docify Command

Generate a documentation website from a CALM model:

```shell
calm docify -a <architecture> -o <output> [--template <file>] [--template-dir <dir>] [--url-to-local-file-mapping <json>] [--clear-output-directory] [--verbose]
```

Creates a browsable site that visualizes nodes, relationships, interfaces, and metadata.

### Using `--url-to-local-file-mapping`

The `validate`, `generate`, `docify`, and `template` commands support URL-to-local-file mapping. This resolves schema references or linked assets (Standards, flows, controls, ADRs) by replacing remote URLs with local paths during execution.

This is especially useful when:

- Patterns reference Standards via canonical URLs that aren't published yet
- Referenced resources live in the same repo but are not public yet
- You need reproducible offline builds in CI
- Documentation reviewers shouldn't depend on internal endpoints

**Mapping file format (JSON object):**

```json
{
    "https://example.com/standards/node-standard.json": "standards/node-standard.json",
    "https://calm.finos.org/docuflow/flow/document-upload": "flows/flow-document-upload.json"
}
```

Paths are resolved relative to the mapping file's location.

**Usage examples:**

```shell
# Validate a pattern that references Standards via URLs
calm validate -p pattern.json -a architecture.json -u url-mapping.json

# Generate architecture from a pattern with URL references
calm generate -p pattern.json -o arch.json -u url-mapping.json

# Docify with URL mapping
calm docify -a architecture.json -o docs/ --url-to-local-file-mapping url-mapping.json
```

**Relative path resolution:** For patterns without an `$id` field, the CLI automatically resolves relative `$ref` paths against the pattern file's directory. No mapping file is needed for relative references.

## Tips

- Keep schema files accessible via `--schema-directory` for offline use.
- Use `calm generate` + `calm validate` workflow to quickly iterate on architectures.
- Leverage warnings to replace placeholder values before production.
- Combine `calm copilot-chatmode` with VS Code for CALM-aware AI assistance.

---



## Kiro-Specific Usage Guidelines

### Interactive Development Workflow
1. **Start with Architecture Creation**: Use the architecture creation tool to establish the overall structure
2. **Incremental Node Addition**: Add nodes one at a time with real-time validation
3. **Relationship Building**: Create relationships with immediate feedback
4. **Pattern Application**: Apply architectural patterns with guided assistance
5. **Continuous Validation**: Validate your architecture as you develop
6. **Documentation Generation**: Generate flows and documentation incrementally

### Context-Aware Assistance
- **Current File Analysis**: I analyze your current CALM file to provide relevant suggestions
- **Schema Compliance**: Real-time checking against CALM v1.0 schema
- **Best Practice Guidance**: Recommendations based on CALM best practices
- **Error Resolution**: Step-by-step guidance for fixing validation errors

### Smart Completions
When editing CALM JSON files, I can provide:
- **Node Templates**: Pre-filled node structures for common types
- **Interface Snippets**: Properly formatted interface definitions
- **Relationship Patterns**: Common relationship configurations
- **Validation Rules**: Schema-compliant property structures

## Best Practices for Kiro

### File Organization
- **Project Structure**: Organize CALM files in logical directory hierarchies
- **Naming Conventions**: Use consistent, descriptive names for files and components
- **Version Control**: Track architecture changes with meaningful commit messages
- **Documentation**: Keep architecture documentation synchronized with implementation

### Development Patterns
- **Iterative Development**: Build architectures incrementally with frequent validation
- **Component Reuse**: Leverage existing patterns and components where possible
- **Validation First**: Validate early and often to catch issues quickly
- **Documentation Driven**: Use CALM as living documentation that evolves with your system

### Common Workflows

#### Creating a New Service Architecture
1. Use architecture-creation tool to establish base structure
2. Define service nodes with appropriate interfaces
3. Create database nodes for persistence
4. Establish relationships between services and data stores
5. Apply microservices or layered patterns as appropriate
6. Validate the complete architecture with real-time feedback

#### Extending Existing Architecture
1. Analyze current architecture structure (I'll help with this)
2. Use node-creation tool for new components
3. Define new interfaces for communication
4. Create relationships to integrate with existing components
5. Update documentation and flows incrementally
6. Validate the extended architecture continuously

#### Pattern Implementation
1. Identify appropriate architectural pattern for your use case
2. Use pattern-creation tool for guidance
3. Implement pattern components with validation
4. Customize pattern for specific requirements
5. Document pattern decisions and rationale
6. Validate pattern implementation against best practices

## Quick Actions for Kiro

I can immediately help you with:
- **Validate Current File**: `calm validate [current-file]`
- **Add Node**: Create a new node with proper structure
- **Create Interface**: Define communication interfaces
- **Add Relationship**: Connect components appropriately
- **Apply Pattern**: Implement architectural patterns
- **Generate Docs**: Create documentation from architecture
- **Fix Validation**: Resolve schema validation errors
- **Optimize Structure**: Improve architecture organization

Just ask me to help with any of these tasks, and I'll provide step-by-step guidance tailored to your current context!