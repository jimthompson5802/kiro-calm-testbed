---
id: notification-service
title: Notification Service
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | notification-service                   |
| **Node Type**       | service             |
| **Name**            | Notification Service                 |
| **Description**     | Handles payment confirmations, failure notifications, and webhook deliveries          |

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
                        notification-api
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
                                        http://notifications.internal:8080/api/v1
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
notification-service[notification-service]:::highlight;
payment-processor -- Connects --> notification-service;
classDef highlight fill:#f2bbae;

```
## Controls
    _No controls defined._

## Metadata
  _No Metadata defined._
