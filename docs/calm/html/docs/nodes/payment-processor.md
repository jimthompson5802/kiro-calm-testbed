---
id: payment-processor
title: Payment Processor Service
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | payment-processor                   |
| **Node Type**       | service             |
| **Name**            | Payment Processor Service                 |
| **Description**     | Core business logic for processing different payment types and orchestrating transactions          |

</div>

## Interfaces
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
                        <b>UniqueId</b>
                    </td>
                    <td>
                        processor-internal-api
                            </td>
                </tr>
                <tr>
                    <td>
                        <b>AdditionalProperties</b>
                    </td>
                    <td>
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
                                        <b>Url</b>
                                    </td>
                                    <td>
                                        http://payment-processor.internal:8080/api/v1
                                            </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>


## Related Nodes
```mermaid
graph TD;
payment-processor[payment-processor]:::highlight;
payment-api-gateway -- Connects --> payment-processor;
payment-processor -- Connects --> payment-database;
payment-processor -- Connects --> redis-cache;
payment-processor -- Connects --> external-payment-provider;
payment-processor -- Connects --> notification-service;
payment-processor -- Connects --> audit-log-store;
classDef highlight fill:#f2bbae;

```
## Controls
    _No controls defined._

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
                  <b>Runtime</b>
              </td>
              <td>
                  Java 17
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Framework</b>
              </td>
              <td>
                  Spring Boot 3.1
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Deployment</b>
              </td>
              <td>
                  Kubernetes
                      </td>
          </tr>
          </tbody>
      </table>
  </div>
