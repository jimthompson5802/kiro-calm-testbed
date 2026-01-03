---
id: administrator
title: Administrator
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | administrator                   |
| **Node Type**       | actor             |
| **Name**            | Administrator                 |
| **Description**     | System administrator responsible for managing payment system operations, monitoring, and configuration          |

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
                        admin-interface
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
                                        https://api.company.com/payments/v1/admin
                                            </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>Protocol</b>
                                    </td>
                                    <td>
                                        HTTPS
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
administrator[administrator]:::highlight;
administrator -- Connects --> payment-api-gateway;
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
                  <b>Role</b>
              </td>
              <td>
                  system-admin
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Access Level</b>
              </td>
              <td>
                  privileged
                      </td>
          </tr>
          <tr>
              <td>
                  <b>Authentication</b>
              </td>
              <td>
                  multi-factor
                      </td>
          </tr>
          </tbody>
      </table>
  </div>
