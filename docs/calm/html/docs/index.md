---
id: index
title: Welcome to CALM Documentation
sidebar_position: 1
slug: /
---

# Welcome to CALM Documentation

This documentation is generated from the **CALM Architecture-as-Code** model.

## High Level Architecture
```mermaid
C4Deployment

    Deployment_Node(deployment, "Architecture", ""){
        Container(payment-api-gateway, "Payment API Gateway", "", "Main entry point for all payment requests with authentication, rate limiting, and routing")
        Container(payment-processor, "Payment Processor Service", "", "Core business logic for processing different payment types and orchestrating transactions")
        Container(payment-database, "Payment Transaction Database", "", "Primary PostgreSQL database storing transaction records, payment methods, and audit logs")
        Container(redis-cache, "Redis Cache Cluster", "", "High-performance cache for session data, rate limiting, and frequently accessed payment data")
        Container(external-payment-provider, "External Payment Provider", "", "Third-party payment processor (Stripe, PayPal, etc.) for card processing and settlements")
        Container(notification-service, "Notification Service", "", "Handles payment confirmations, failure notifications, and webhook deliveries")
        Container(audit-log-store, "Audit Log Store", "", "Immutable audit trail for all payment operations and compliance reporting")
        Person(administrator, "Administrator", "System administrator responsible for managing payment system operations, monitoring, and configuration")
        Person(customer, "Customer", "End user who initiates payment transactions through various channels including web, mobile, and API integrations")
    }

    Rel(payment-api-gateway,payment-processor,"Connects To")
    Rel(payment-processor,payment-database,"Connects To")
    Rel(payment-processor,redis-cache,"Connects To")
    Rel(payment-processor,external-payment-provider,"Connects To")
    Rel(payment-processor,notification-service,"Connects To")
    Rel(payment-processor,audit-log-store,"Connects To")
    Rel(administrator,payment-api-gateway,"Connects To")
    Rel(customer,payment-api-gateway,"Connects To")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="2")
```
## Nodes
    - [Payment API Gateway](nodes/payment-api-gateway)
    - [Payment Processor Service](nodes/payment-processor)
    - [Payment Transaction Database](nodes/payment-database)
    - [Redis Cache Cluster](nodes/redis-cache)
    - [External Payment Provider](nodes/external-payment-provider)
    - [Notification Service](nodes/notification-service)
    - [Audit Log Store](nodes/audit-log-store)
    - [Administrator](nodes/administrator)
    - [Customer](nodes/customer)

## Relationships
    - [Gateway To Processor](relationships/gateway-to-processor)
    - [Processor To Database](relationships/processor-to-database)
    - [Processor To Cache](relationships/processor-to-cache)
    - [Processor To External Provider](relationships/processor-to-external-provider)
    - [Processor To Notifications](relationships/processor-to-notifications)
    - [Processor To Audit](relationships/processor-to-audit)
    - [Administrator To Gateway](relationships/administrator-to-gateway)
    - [Customer To Gateway](relationships/customer-to-gateway)


## Flows
    - [Credit Card Payment Processing](flows/credit-card-payment-flow)
    - [Payment Refund Processing](flows/refund-processing-flow)

## Controls
  _No Controls defined._

## Metadata
  <div className="table-container">
      <table>
          <thead>
          <tr>
              <th>Key</th>
              <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                  <b>Version</b>
              </td>
              <td>
                  2.1.0
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Owner</b>
              </td>
              <td>
                  Payment Platform Team
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Environment</b>
              </td>
              <td>
                  production
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Compliance</b>
              </td>
              <td>
                  <ul>
                      <li>PCI-DSS</li>
                      <li>SOX</li>
                      <li>GDPR</li>
                  </ul>
              </td>
          </tr>
          <tr>
              <td>
                  <b>Criticality</b>
              </td>
              <td>
                  high
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Last Updated</b>
              </td>
              <td>
                  2025-01-03T10:00:00Z
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Business Unit</b>
              </td>
              <td>
                  Financial Services
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Cost Center</b>
              </td>
              <td>
                  FINTECH-001
                      </td>
          </tr>
          </tbody>
      </table>
  </div>

## Adrs
  _No Adrs defined._
