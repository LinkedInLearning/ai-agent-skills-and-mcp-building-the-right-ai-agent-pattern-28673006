// Simulates a new beta ticket arriving after the last status update.
// Used in video 03_02 to show that MCP answers change when the system changes.
import { read, write } from "../store.js";

const tickets = read("tickets");
const id = "TCK-2031";
if (tickets.some((t) => t.id === id)) {
  console.log(`${id} already exists. Run "npm run reset" first if you want to replay the demo.`);
  process.exit(0);
}
const { reviewDate } = read("project");
tickets.push({
  id,
  title: "SSO sign-in fails for all Microsoft Entra ID tenants on rc3",
  customer: "Multiple (6 beta customers)",
  priority: "P1",
  status: "open",
  opened: reviewDate,
  tags: ["auth"],
  affectedCustomers: 6,
  summary: "Since release candidate 3, users from Entra ID tenants cannot sign in at all. No workaround.",
});
write("tickets", tickets);
console.log(`New ticket ${id} added: SSO sign-in fails for 6 beta customers (P1).`);
