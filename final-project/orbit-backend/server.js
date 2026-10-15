#!/usr/bin/env node
// Orbit Labs MCP server
// Exposes the (simulated) project tracker and beta support desk to an AI agent.
// Transport: stdio. Start it from your agent's MCP config, not by hand.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { read, write, ticketsWithAge } from "./store.js";

const server = new McpServer({ name: "orbit", version: "1.0.0" });

const json = (value) => ({ content: [{ type: "text", text: JSON.stringify(value, null, 2) }] });
const readOnly = { readOnlyHint: true, openWorldHint: false };

// ---------- Resources: read-only context the app can attach ----------

server.registerResource(
  "project",
  "orbit://project",
  { title: "Orbit 2.0 project overview", description: "Launch date, review date, and owner.", mimeType: "application/json" },
  async (uri) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(read("project"), null, 2) }] })
);

server.registerResource(
  "milestones",
  "orbit://milestones",
  { title: "Launch milestones", description: "All Orbit 2.0 milestones with due dates and status.", mimeType: "application/json" },
  async (uri) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(read("milestones"), null, 2) }] })
);

// ---------- Tools: things the agent can call ----------

server.registerTool(
  "get_project",
  {
    title: "Get project overview",
    description: "Returns the Orbit 2.0 launch date, the current review date, and the launch owner. Call this first in any launch review.",
    inputSchema: {},
    annotations: readOnly,
  },
  async () => json(read("project"))
);

server.registerTool(
  "list_milestones",
  {
    title: "List milestones",
    description: "Lists Orbit 2.0 launch milestones with due dates, status, owner, and linked task IDs.",
    inputSchema: {},
    annotations: readOnly,
  },
  async () => json(read("milestones"))
);

server.registerTool(
  "list_tasks",
  {
    title: "List tasks",
    description: "Lists project tasks. Filter by status, milestone, or only tasks with no owner.",
    inputSchema: {
      status: z.enum(["todo", "in_progress", "blocked", "done"]).optional().describe("Only return tasks with this status."),
      milestone: z.string().optional().describe("Milestone ID, for example M2."),
      unassigned_only: z.boolean().optional().describe("Only return tasks that have no owner."),
    },
    annotations: readOnly,
  },
  async ({ status, milestone, unassigned_only }) => {
    let tasks = read("tasks");
    if (status) tasks = tasks.filter((t) => t.status === status);
    if (milestone) tasks = tasks.filter((t) => t.milestone === milestone);
    if (unassigned_only) tasks = tasks.filter((t) => !t.owner);
    return json(tasks);
  }
);

server.registerTool(
  "search_tickets",
  {
    title: "Search beta support tickets",
    description:
      "Searches beta support tickets. Each result includes daysOpen, measured against the project review date. Filter by status, priority, tag, or minimum days open.",
    inputSchema: {
      status: z.enum(["open", "pending_customer", "closed"]).optional().describe("Ticket status. Omit to search all tickets."),
      priority: z.enum(["P1", "P2", "P3", "P4"]).optional(),
      tag: z.string().optional().describe("Ticket tag, for example payments or auth."),
      min_days_open: z.number().int().min(0).optional().describe("Only tickets open at least this many days."),
    },
    annotations: readOnly,
  },
  async ({ status, priority, tag, min_days_open }) => {
    let tickets = ticketsWithAge();
    if (status) tickets = tickets.filter((t) => t.status === status);
    if (priority) tickets = tickets.filter((t) => t.priority === priority);
    if (tag) tickets = tickets.filter((t) => t.tags.includes(tag));
    if (min_days_open !== undefined) tickets = tickets.filter((t) => t.daysOpen !== null && t.daysOpen >= min_days_open);
    return json(tickets);
  }
);

server.registerTool(
  "get_ticket",
  {
    title: "Get ticket",
    description: "Returns one support ticket by ID, for example TCK-1987.",
    inputSchema: { id: z.string().describe("Ticket ID.") },
    annotations: readOnly,
  },
  async ({ id }) => {
    const ticket = ticketsWithAge().find((t) => t.id.toLowerCase() === id.toLowerCase());
    if (!ticket) return { isError: true, content: [{ type: "text", text: `No ticket with ID ${id}.` }] };
    return json(ticket);
  }
);

server.registerTool(
  "list_risk_items",
  {
    title: "List risk items",
    description: "Lists risk items already recorded in the launch risk register. Check this before creating new items to avoid duplicates.",
    inputSchema: {},
    annotations: readOnly,
  },
  async () => json(read("risk-items"))
);

server.registerTool(
  "create_risk_item",
  {
    title: "Create risk item",
    description: "Records a new item in the Orbit 2.0 launch risk register. This writes to a shared system that the whole team sees.",
    inputSchema: {
      title: z.string().min(5).describe("Short description of the risk."),
      severity: z.enum(["High", "Medium", "Low"]),
      evidence: z.array(z.string()).min(1).describe("IDs or quotes that support the risk, for example T-104 or TCK-1987."),
      next_action: z.string().describe("The recommended next action."),
      suggested_owner: z.string().optional(),
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  },
  async ({ title, severity, evidence, next_action, suggested_owner }) => {
    const items = read("risk-items");
    const { reviewDate } = read("project");
    const item = {
      id: `RISK-${String(items.length + 1).padStart(3, "0")}`,
      title,
      severity,
      evidence,
      next_action,
      suggested_owner: suggested_owner ?? null,
      created: reviewDate,
      status: "open",
    };
    items.push(item);
    write("risk-items", items);
    return json({ created: item });
  }
);

await server.connect(new StdioServerTransport());
console.error("Orbit Labs MCP server running (stdio)");
