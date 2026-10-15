# orbit-backend

This folder plays the role of Orbit Labs' internal company systems: a project tracker and a beta support desk. In a real company these would be tools like Jira, Linear, Zendesk, or GitHub Issues. Here they're a few JSON files behind a small MCP server so you can run everything locally with no accounts.

**Don't open this folder in your AI agent.** Your agent works in `../orbit-launch`. The only way it should reach this data is through MCP, starting in Chapter 3.

## Setup

```bash
npm install
npm run check      # starts the server, lists its tools, confirms it works
```

## Scripts

| Command | What it does |
|---|---|
| `npm run check` | Confirms the MCP server starts and lists its tools and resources |
| `npm run reset` | Restores `data/` from `seed/` (clears risk items and demo tickets) |
| `npm run demo:new-ticket` | Adds a new P1 ticket, used in video 03_02 to show live data changing |

## What the server exposes

**Resources:** `orbit://project`, `orbit://milestones`

**Tools:** `get_project`, `list_milestones`, `list_tasks`, `search_tickets`, `get_ticket`, `list_risk_items`, `create_risk_item`

`create_risk_item` is the only tool that writes. Everything else is read-only.

Ticket ages (`daysOpen`) are measured against the project's review date (Oct 5, 2026), not today's date, so every learner sees the same results.
