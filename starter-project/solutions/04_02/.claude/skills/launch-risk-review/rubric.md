# Launch risk rubric

## Severity

| Severity | Use when |
|---|---|
| **High** | The risk could delay the launch by **more than two weeks**. |
| **Medium** | The risk could delay the launch by **one to two weeks**, or would hurt launch quality without delaying it. |
| **Low** | Anything else worth tracking. |

## Escalation rules

These raise severity. They never lower it.

- **Unowned launch-critical work:** any task needed for a launch milestone with no owner is at least **Medium**.
- **Systemic customer issue:** three or more open tickets about the same problem, each open more than 7 days, are one risk. **High** if any of them are P1 or P2, otherwise **Medium**.
- **Widespread blocker:** any open P1 ticket affecting more than 3 customers is **High**, regardless of age.
- **Vendor slip:** a vendor date that moves past the milestone that depends on it is at least **Medium**. Work out the new finish date to decide whether it's High.

## What to ignore

- Closed tickets.
- Tickets waiting on the customer (`pending_customer`).
- Cosmetic issues and feature requests, unless more than 10 customers reported them.
- Work already marked done.
