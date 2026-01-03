---
id: external-payment-provider
title: External Payment Provider
---

## Details
<div className="table-container">
| Field               | Value                    |
|---------------------|--------------------------|
| **Unique ID**       | external-payment-provider                   |
| **Node Type**       | external-service             |
| **Name**            | External Payment Provider                 |
| **Description**     | Third-party payment processor (Stripe, PayPal, etc.) for card processing and settlements          |

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
                        provider-api
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
                                        https://api.stripe.com/v1
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
external-payment-provider[external-payment-provider]:::highlight;
payment-processor -- Connects --> external-payment-provider;
classDef highlight fill:#f2bbae;

```
## Controls
    _No controls defined._

## Metadata
  _No Metadata defined._
