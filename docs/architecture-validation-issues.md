### Issue resolved

With the conversion from file pattern inclusion rule to `manual`, and using the explicit steering document in the command, the following issue no longer occurs.

---

output from `npx clam validate -a docs/calm/payment.calm.json`

```
Mac:jim kiro-calm-testbed[507]$ npx calm validate -a calm/docs/payment.calm.json 
(node:65949) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
info [file-system-document-loader]:     calm/docs/payment.calm.json exists, loading as file...
info [calm-validate]:     Formatting output as json
{
    "jsonSchemaValidationOutputs": [],
    "spectralSchemaValidationOutputs": [
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'payment-gateway' is not referenced by any relationships.",
            "path": "/nodes/payment-gateway/unique-id",
            "schemaPath": "",
            "line_start": 12,
            "line_end": 12,
            "character_start": 19,
            "character_end": 36,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'payment-processor' is not referenced by any relationships.",
            "path": "/nodes/payment-processor/unique-id",
            "schemaPath": "",
            "line_start": 28,
            "line_end": 28,
            "character_start": 19,
            "character_end": 38,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'fraud-detection' is not referenced by any relationships.",
            "path": "/nodes/fraud-detection/unique-id",
            "schemaPath": "",
            "line_start": 43,
            "line_end": 43,
            "character_start": 19,
            "character_end": 36,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'payment-vault' is not referenced by any relationships.",
            "path": "/nodes/payment-vault/unique-id",
            "schemaPath": "",
            "line_start": 59,
            "line_end": 59,
            "character_start": 19,
            "character_end": 34,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'settlement-service' is not referenced by any relationships.",
            "path": "/nodes/settlement-service/unique-id",
            "schemaPath": "",
            "line_start": 75,
            "line_end": 75,
            "character_start": 19,
            "character_end": 39,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'notification-service' is not referenced by any relationships.",
            "path": "/nodes/notification-service/unique-id",
            "schemaPath": "",
            "line_start": 91,
            "line_end": 91,
            "character_start": 19,
            "character_end": 41,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'payment-db' is not referenced by any relationships.",
            "path": "/nodes/payment-db/unique-id",
            "schemaPath": "",
            "line_start": 107,
            "line_end": 107,
            "character_start": 19,
            "character_end": 31,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'vault-db' is not referenced by any relationships.",
            "path": "/nodes/vault-db/unique-id",
            "schemaPath": "",
            "line_start": 115,
            "line_end": 115,
            "character_start": 19,
            "character_end": 29,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'event-bus' is not referenced by any relationships.",
            "path": "/nodes/event-bus/unique-id",
            "schemaPath": "",
            "line_start": 124,
            "line_end": 124,
            "character_start": 19,
            "character_end": 30,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'stripe-provider' is not referenced by any relationships.",
            "path": "/nodes/stripe-provider/unique-id",
            "schemaPath": "",
            "line_start": 131,
            "line_end": 131,
            "character_start": 19,
            "character_end": 36,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'paypal-provider' is not referenced by any relationships.",
            "path": "/nodes/paypal-provider/unique-id",
            "schemaPath": "",
            "line_start": 145,
            "line_end": 145,
            "character_start": 19,
            "character_end": 36,
            "source": "architecture"
        },
        {
            "code": "architecture-nodes-must-be-referenced",
            "severity": "warning",
            "message": "Node with ID 'api-gateway' is not referenced by any relationships.",
            "path": "/nodes/api-gateway/unique-id",
            "schemaPath": "",
            "line_start": 159,
            "line_end": 159,
            "character_start": 19,
            "character_end": 32,
            "source": "architecture"
        }
    ],
    "hasErrors": false,
    "hasWarnings": true
Mac:jim kiro-calm-testbed[508]$ 
```