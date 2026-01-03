# Adding CALM Nodes and Interfaces

Using the KIRO adapted `.kiro/steering` directives to add CALM Nodes and Interfaces to the architecture file and regenerate the architecture documentation artifacts.


## KIRO CHAT LOG

### what nodes are in docs/payment-system.architecture.json

Kiro
Read file(s)

payment-system.architecture.json
The payment system architecture contains 7 nodes:

payment-api-gateway (service) - Main entry point for payment requests with authentication and routing
payment-processor (service) - Core business logic for processing different payment types
payment-database (database) - PostgreSQL database storing transaction records and audit logs
redis-cache (cache) - High-performance cache for session data and rate limiting
external-payment-provider (external-service) - Third-party payment processor like Stripe or PayPal
notification-service (service) - Handles payment confirmations and webhook deliveries
audit-log-store (database) - Immutable audit trail for compliance reporting
The architecture follows a typical microservices pattern with the API gateway routing requests to the payment processor, which then coordinates with various data stores and external services to complete payment transactions.

Credits used: 0.15
Elapsed time: 8s


Checkpoint
Restore

### #node-creation.md  add a node called "Administrator"  and #interface-creation.md  create interface from "Administrator" to "payment-api-gateway" node.

Kiro
I'll help you add an "Administrator" node and create an interface from it to the "payment-api-gateway" node. Let me first read the current architecture file and then make the necessary additions.

Read file(s)

payment-system.architecture.json
Now I'll add the Administrator node to the nodes array. Based on the CALM schema, I'll use "actor" as the node-type since administrators are typically external users who interact with the system.

Accepted edits to

payment-system.architecture.json


Now I need to add a relationship from the Administrator to the payment-api-gateway. I'll add this to the relationships array:

Accepted edits to

payment-system.architecture.json


Perfect! I've successfully added:

Administrator Node:

unique-id: "administrator"
node-type: "actor" (appropriate for external users/administrators)
name: "Administrator"
description: Describes the administrator's role in managing payment system operations
interfaces: Added an admin interface using the flexible interface-type approach with URL and protocol
metadata: Included role, access level, and authentication requirements
Administrator-to-Gateway Relationship:

unique-id: "administrator-to-gateway"
description: Describes how administrators access administrative functions
relationship-type: Connects administrator node to payment-api-gateway node
protocol: "HTTPS" for secure administrative access
The Administrator node now has an interface that connects to the payment-api-gateway through a dedicated admin endpoint (https://api.company.com/payments/v1/admin), allowing administrators to manage the payment system through the same gateway but with privileged access and multi-factor authentication.

Credits used: 0.43
Elapsed time: 20s


Checkpoint
Restore
### #node-creation.md  add a node called "Customer"  and #interface-creation.md  create interface from "Administrator" to "payment-api-gateway" node.

Kiro
I notice there's a small discrepancy in your request - you mentioned creating an interface from "Administrator" to "payment-api-gateway", but I already created that relationship in the previous step. I believe you meant to create an interface from "Customer" to "payment-api-gateway". Let me add the Customer node and create that relationship.

First, I'll add the Customer node to the architecture:

Accepted edits to

payment-system.architecture.json


Now I'll add the relationship from Customer to the payment-api-gateway:

Accepted edits to

payment-system.architecture.json


Perfect! I've successfully added:

Customer Node:

unique-id: "customer"
node-type: "actor" (appropriate for end users)
name: "Customer"
description: Describes customers who initiate payment transactions
interfaces: Added a customer interface using the flexible interface-type approach with the main payment API URL
metadata: Included role as "end-user", standard access level, and OAuth2 authentication
Customer-to-Gateway Relationship:

unique-id: "customer-to-gateway"
description: Describes how customers initiate payment transactions
relationship-type: Connects customer node to payment-api-gateway node
protocol: "HTTPS" for secure payment transactions
Now the architecture includes both Administrator and Customer actors, each with their own interfaces and relationships to the payment-api-gateway:

Administrator: Uses admin endpoint (/admin) with multi-factor authentication and privileged access
Customer: Uses standard payment endpoint with OAuth2 authentication and standard access level
Both actors connect to the same payment-api-gateway but through different interfaces, reflecting the different access patterns and security requirements for each user type.

Credits used: 0.36
Elapsed time: 19s


Checkpoint
Restore

### #calm-cli-instructions.md validate the architecture

Kiro
I'll validate the payment system architecture using the CALM CLI. Let me run the validation command:

Command
calm validate -a docs/payment-system.architecture.json -f pretty
info [file-system-document-loader]:     docs/payment-system.architecture.j
son exists, loading as file...                                            info [calm-validate]:     Formatting output as pretty
Summary
- Errors: no (0)
- Warnings: no (0)
- Info/Hints: 0

No issues found.
Perfect! The architecture validation passed successfully with no errors or warnings.

The CALM CLI validation confirms that:

✅ Architecture is valid - The JSON structure follows the CALM schema correctly ✅ No schema violations - All required properties are present and properly formatted ✅ No linting issues - Spectral rules passed without warnings ✅ Clean validation - Zero errors, warnings, or hints

The payment system architecture with the newly added Administrator and Customer nodes is properly structured and compliant with the CALM v1.1 specification. All nodes have the required properties (unique-id, node-type, name, description), interfaces follow the correct schema, and relationships are properly defined.

Credits used: 0.21
Elapsed time: 10s


Checkpoint
Restore
### #documentation-creation.md  create documentation in doc/calm/html

Kiro
I'll create documentation for the payment system architecture in the docs/calm/html directory using the CALM CLI docify command. Let me generate the documentation:

Command
calm docify -a docs/payment-system.architecture.json -o docs/calm/html --clear-output-directory --verbose

** DELETED LINES FOR CLARITY **


📚 Generated Documentation Structure
Core Files
docusaurus.config.js - Docusaurus configuration with Mermaid support
package.json - Dependencies for running the documentation site
sidebars.js - Navigation structure
Documentation Pages
docs/index.md - Main landing page with architecture overview
Node Documentation (9 pages)
Administrator, Customer (the actors we added)
Payment API Gateway, Payment Processor
Payment Database, Audit Log Store
Redis Cache, Notification Service
External Payment Provider
Relationship Documentation (8 pages)
Administrator-to-Gateway, Customer-to-Gateway (new relationships)
Gateway-to-Processor, Processor-to-Database
Processor-to-Cache, Processor-to-External-Provider
Processor-to-Notifications, Processor-to-Audit
Flow Documentation (2 pages)
Credit Card Payment Flow
Refund Processing Flow
Static Assets
CALM icon and custom CSS styling
🚀 Next Steps
To view the documentation, you can:

Install dependencies and start the dev server:
cd docs/calm/html
npm install
npm start
Build static site:
npm run build
The documentation includes interactive Mermaid diagrams, detailed node specifications, relationship mappings, and flow visualizations - all automatically generated from your CALM architecture model. The site will be available at http://localhost:3000 when you start the development server.

Credits used: 0.58
Elapsed time: 54s


Revert








Auto
Autopilot
