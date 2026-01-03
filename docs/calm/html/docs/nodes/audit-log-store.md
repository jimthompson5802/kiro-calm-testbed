---
id: audit-log-store
title: Audit Log Store
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | audit-log-store                   |
| **Node Type**       | database             |
| **Name**            | Audit Log Store                 |
| **Description**     | Immutable audit trail for all payment operations and compliance reporting          |

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
                        audit-db-connection
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
                                        <b>Host</b>
                                    </td>
                                    <td>
                                        audit-db.internal.local
                                            </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Port</b>
                                    </td>
                                    <td>
                                        5432
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
audit-log-store[audit-log-store]:::highlight;
payment-processor -- Connects --> audit-log-store;
classDef highlight fill:#f2bbae;

```
## Controls
    _No controls defined._

## Metadata
  _No Metadata defined._
