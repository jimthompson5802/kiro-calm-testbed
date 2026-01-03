---
id: redis-cache
title: Redis Cache Cluster
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | redis-cache                   |
| **Node Type**       | cache             |
| **Name**            | Redis Cache Cluster                 |
| **Description**     | High-performance cache for session data, rate limiting, and frequently accessed payment data          |

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
                        redis-endpoint
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
                                        redis-cluster.internal.local
                                            </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Port</b>
                                    </td>
                                    <td>
                                        6379
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
redis-cache[redis-cache]:::highlight;
payment-processor -- Connects --> redis-cache;
classDef highlight fill:#f2bbae;

```
## Controls
    _No controls defined._

## Metadata
  _No Metadata defined._
