---
inclusion: fileMatch
fileMatchPattern: ['**/*.architecture.json', 'calm/**/*.json']
---

# CALM Architecture Creation Guide

## Critical Requirements

🚨 **ALWAYS call the architecture creation tool before creating architectures**
🚨 **ALWAYS validate with `calm validate -a <file>` after creation**
🚨 **JSON validity ≠ CALM validity - validation is mandatory**

## Required Properties

Every CALM architecture MUST include:

- `$schema`: `"https://calm.finos.org/release/1.1/meta/calm.json"`
- `unique-id`: Unique identifier in kebab-case (e.g., `payment-processing-system`)
- `name`: Human-readable Title Case name (e.g., `Payment Processing System`)
- `description`: Detailed description of the architecture's purpose and scope

## Optional Properties

- `metadata`: Operational/governance information (see metadata-creation.md)
- `nodes`: Architecture components (see node-creation.md)
- `relationships`: Connections between nodes (see relationship-creation.md)
- `flows`: Business processes (see flow-creation.md)
- `controls`: Compliance requirements (see control-creation.md)

## Creation Workflow

Follow this sequence when creating CALM architectures:

### 1. Base Structure (Required)

Create minimal valid architecture with required properties:

```json
{
    "$schema": "https://calm.finos.org/release/1.1/meta/calm.json",
    "unique-id": "payment-processing-system",
    "name": "Payment Processing System",
    "description": "Core payment processing architecture handling transactions, settlements, and reconciliation"
}
```

### 2. Metadata (Recommended)

Add operational and governance information:

```json
"metadata": {
    "version": "2.1.0",
    "owner": "Payment Platform Team",
    "environment": "production",
    "compliance": ["PCI-DSS", "SOX"],
    "last-updated": "2025-01-03T10:00:00Z"
}
```

### 3. Nodes (Core Components)

**MUST call node creation tool before adding nodes.**

```json
"nodes": [
    {
        "unique-id": "payment-api",
        "node-type": "service",
        "name": "Payment API Service",
        "description": "REST API for payment processing requests",
        "interfaces": [
            {
                "unique-id": "payment-api-endpoint",
                "url": "https://api.company.com/payments/v1"
            }
        ]
    },
    {
        "unique-id": "payment-database",
        "node-type": "database",
        "name": "Payment Database",
        "description": "Primary database storing transaction records"
    }
]
```

### 4. Relationships (Connections)

**MUST call relationship creation tool before adding relationships.**

```json
"relationships": [
    {
        "unique-id": "api-to-database",
        "description": "Stores and retrieves payment transactions from",
        "relationship-type": {
            "connects": {
                "source": { "node": "payment-api" },
                "destination": { "node": "payment-database" }
            }
        },
        "protocol": "JDBC"
    }
]
```

### 5. Flows (Optional)

**MUST call flow creation tool before adding flows.**

```json
"flows": [
    {
        "unique-id": "payment-processing-flow",
        "name": "Payment Processing",
        "description": "End-to-end payment transaction processing",
        "transitions": [
            {
                "relationship-unique-id": "api-to-database",
                "sequence-number": 1,
                "description": "Store payment transaction"
            }
        ]
    }
]
```

### 6. Controls (Optional)

**MUST call control creation tool before adding controls.**

```json
"controls": {
    "pci-compliance": {
        "description": "PCI-DSS requirements for payment data",
        "requirements": [
            {
                "requirement-url": "https://schemas.company.com/compliance/pci-dss.json",
                "config": {
                    "scope": "cardholder-data",
                    "validation-level": "Level-1"
                }
            }
        ]
    }
}
```

## Validation (Mandatory)

After creating or modifying any architecture, ALWAYS validate:

```bash
calm validate -a <filename>.architecture.json
```

**Required validation checks:**
- `"hasErrors": false` - No schema validation errors
- `"hasWarnings": false` - No linting warnings (or document why warnings are acceptable)

**Validation output contains:**
- `jsonSchemaValidationOutputs`: Schema compliance errors
- `spectralSchemaValidationOutputs`: Linting warnings/errors

**Critical:** JSON syntax validity does NOT guarantee CALM schema compliance. Always validate.

## File Naming Convention

Architecture files MUST use `.architecture.json` suffix:

✅ `payment-system.architecture.json`
✅ `trading-platform.architecture.json`
❌ `payment-system.json`
❌ `architecture.json`

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| `unique-id` | kebab-case | `payment-processing-system` |
| `name` | Title Case | `Payment Processing System` |
| Node IDs | kebab-case | `payment-api`, `payment-database` |
| Relationship IDs | kebab-case | `api-to-database`, `service-to-queue` |
| Flow IDs | kebab-case | `payment-processing-flow` |
| Control names | kebab-case | `pci-compliance`, `data-encryption` |

## Modular Architectures

For complex systems, use node `details` property to reference detailed subsystem architectures:

```json
{
    "unique-id": "payment-system",
    "node-type": "system",
    "name": "Payment System",
    "description": "Complete payment processing system",
    "details": {
        "detailed-architecture": "https://calm.company.com/architectures/payment-system-detailed.architecture.json"
    }
}
```

This enables high-level architectures to link to detailed component architectures without duplication.

## Common Validation Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Missing required property | Omitted `$schema`, `unique-id`, `name`, or `description` | Add all required properties |
| Invalid node reference | Relationship references non-existent node ID | Ensure relationship node IDs match existing nodes |
| Missing node properties | Node lacks required fields | Every node needs `unique-id`, `node-type`, `name`, `description` |
| Invalid protocol | Protocol not in allowed enum | Use valid protocol: `HTTP`, `HTTPS`, `JDBC`, `AMQP`, etc. |
| Duplicate unique-id | Multiple elements share same ID | Ensure all IDs are unique within their scope |
| Invalid interface structure | Interface missing required properties | Use interface creation tool for proper structure |

## Best Practices

1. **Incremental Development**: Start with base structure, add complexity gradually
2. **Tool Usage**: Always call creation tools for nodes, relationships, flows, controls
3. **Early Validation**: Run `calm validate` after each major addition
4. **Business Language**: Use stakeholder-friendly names and descriptions
5. **Consistent Naming**: Apply kebab-case for IDs, Title Case for names
6. **Rich Metadata**: Include operational details for tooling and automation
7. **Clear Intent**: Write descriptions that explain architectural decisions
8. **Standards Integration**: Reference Standards for consistent properties across components
9. **Modular Design**: Break complex systems into detailed architectures
10. **Version Tracking**: Use semantic versioning in metadata

## Cross-References

- **node-creation.md**: Detailed guidance for creating nodes
- **relationship-creation.md**: How to connect nodes with relationships
- **interface-creation.md**: Node interface specifications
- **flow-creation.md**: Business process flows
- **control-creation.md**: Compliance and governance controls
- **metadata-creation.md**: Metadata structure and usage
- **standards-creation.md**: Organization-specific property extensions
- **pattern-creation.md**: Reusable architecture templates
- **calm-cli-instructions.md**: Complete CLI validation and generation commands

## Complete Example

Minimal but complete architecture demonstrating all major components:

```json
{
    "$schema": "https://calm.finos.org/release/1.1/meta/calm.json",
    "unique-id": "payment-processing-system",
    "name": "Payment Processing System",
    "description": "Core payment processing architecture handling transactions, settlements, and reconciliation for all payment types",
    "metadata": {
        "version": "2.1.0",
        "owner": "Payment Platform Team",
        "environment": "production",
        "compliance": ["PCI-DSS", "SOX"],
        "criticality": "high",
        "last-updated": "2025-01-03T10:00:00Z"
    },
    "nodes": [
        {
            "unique-id": "payment-api",
            "node-type": "service",
            "name": "Payment API Service",
            "description": "REST API for payment processing requests",
            "interfaces": [
                {
                    "unique-id": "payment-api-endpoint",
                    "url": "https://api.company.com/payments/v1"
                }
            ],
            "metadata": {
                "runtime": "Java 17",
                "framework": "Spring Boot 3.1"
            }
        },
        {
            "unique-id": "payment-database",
            "node-type": "database",
            "name": "Payment Database",
            "description": "Primary database storing transaction records",
            "interfaces": [
                {
                    "unique-id": "db-connection",
                    "host": "payment-db.internal.local",
                    "port": 5432
                }
            ]
        }
    ],
    "relationships": [
        {
            "unique-id": "api-to-database",
            "description": "Stores and retrieves payment transactions from",
            "relationship-type": {
                "connects": {
                    "source": { "node": "payment-api" },
                    "destination": { "node": "payment-database" }
                }
            },
            "protocol": "JDBC"
        }
    ],
    "flows": [
        {
            "unique-id": "payment-processing-flow",
            "name": "Payment Processing",
            "description": "End-to-end payment transaction processing",
            "transitions": [
                {
                    "relationship-unique-id": "api-to-database",
                    "sequence-number": 1,
                    "description": "Store payment transaction in database"
                }
            ]
        }
    ],
    "controls": {
        "pci-compliance": {
            "description": "PCI-DSS requirements for payment card data",
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
    }
}
```
```
