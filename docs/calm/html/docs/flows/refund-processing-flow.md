---
id: refund-processing-flow
title: Payment Refund Processing
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | refund-processing-flow                   |
| **Name**            | Payment Refund Processing                 |
| **Description**     | Flow for processing payment refunds and reversals          |
</div>

## Sequence Diagram
```mermaid
sequenceDiagram
            Payment API Gateway ->> Payment Processor Service: Receive refund request through API Gateway
            Payment Processor Service ->> Payment Transaction Database: Validate original transaction exists and is refundable
            Payment Processor Service ->> External Payment Provider: Process refund through original payment provider
            Payment Processor Service ->> Payment Transaction Database: Update transaction status and create refund record
            Payment Processor Service ->> Audit Log Store: Log refund operation for audit compliance
            Payment Processor Service ->> Notification Service: Notify customer of successful refund processing
```
## Controls
    _No controls defined._

## Metadata
  _No Metadata defined._
