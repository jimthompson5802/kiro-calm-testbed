---
id: payment-database
title: Payment Transaction Database
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | payment-database                   |
| **Node Type**       | database             |
| **Name**            | Payment Transaction Database                 |
| **Description**     | Primary PostgreSQL database storing transaction records, payment methods, and audit logs          |

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
                        db-connection
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
                                        payment-db.internal.local
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
                                <tr>
                                    <td>
                                        <b>Protocol</b>
                                    </td>
                                    <td>
                                        PostgreSQL
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
payment-database[payment-database]:::highlight;
payment-processor -- Connects --> payment-database;
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
                  <b>Database Type</b>
              </td>
              <td>
                  PostgreSQL 15
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Backup Frequency</b>
              </td>
              <td>
                  hourly
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Encryption</b>
              </td>
              <td>
                  AES-256
                      </td>
          </tr>
          </tbody>
      </table>
  </div>
