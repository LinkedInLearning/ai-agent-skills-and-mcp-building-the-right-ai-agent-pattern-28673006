// Starts the MCP server, connects as a client, and lists what it exposes.
// Handy for confirming your setup works before connecting an agent.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const client = new Client({ name: "orbit-check", version: "1.0.0" });
await client.connect(new StdioClientTransport({ command: process.execPath, args: [join(here, "..", "server.js")], stderr: "ignore" }));

const { tools } = await client.listTools();
const { resources } = await client.listResources();
console.log("Orbit Labs MCP server is working.\n");
console.log("Tools:");
for (const t of tools) console.log(`  - ${t.name}: ${t.title ?? ""}`);
console.log("\nResources:");
for (const r of resources) console.log(`  - ${r.uri}: ${r.title ?? r.name}`);

const res = await client.callTool({ name: "search_tickets", arguments: { status: "open", min_days_open: 7 } });
const old = JSON.parse(res.content[0].text);
console.log(`\nOpen tickets older than 7 days: ${old.length}`);
await client.close();
