# AI Agent Skills and MCP: Course Project

Exercise files for the LinkedIn Learning course **AI Agent Skills and MCP: Building the Right AI Agent Pattern** by Stephen Simon.

In this course you build one workflow, a weekly launch risk review for the fictional company Orbit Labs, four ways: as a prompt, as an Agent Skill, with MCP, and with Skills and MCP together.

## What's in this repo

| Folder | Use it for |
|---|---|
| `starter-project/` | The project you start the course with. Follow along video by video from here. |
| `final-project/` | The completed project as it looks at the end of the course. Use it as a reference. |

Each folder is self-contained, with two parts:

- `orbit-launch/` is the workspace. Open this folder in your AI agent.
- `orbit-backend/` plays the role of Orbit Labs' company systems (a project tracker and a beta support desk) behind a small MCP server. Don't open it in your agent. In Chapter 3 your agent reaches it through MCP.

The starter project also has a `solutions/` folder with the end state of every hands-on video.

## Requirements

- Node.js 20 or later
- An AI coding agent that supports Agent Skills and MCP. The course uses Claude Code.

No cloud accounts or API tokens are needed. Everything runs on your machine.

## Get started

```bash
cd starter-project/orbit-backend
npm install
npm run check
cd ../orbit-launch
claude
```

`npm run check` should list seven tools, two resources, and `Open tickets older than 7 days: 6`. Then follow the handout for each video.

## Catch up to any video

If you fall behind or skip ahead, run this from the `starter-project` folder:

```bash
node solutions/catch-up.mjs 03_01
```

It brings `orbit-launch/` to the end state of that video. See `starter-project/solutions/README.md` for the list of checkpoints.

## Reset the company data

Some videos add tickets or write risk items. To start clean, run this from `orbit-backend/`:

```bash
npm run reset
```

## Try the final project

```bash
cd final-project/orbit-backend
npm install
cd ../orbit-launch
claude
```

Approve the `orbit` MCP server when Claude Code asks, then send:

```text
Do this week's launch review.
```

The agent loads the `launch-risk-review` Skill, gathers live data through the `orbit` server, writes the report, and records new High risks in the risk register. Run `npm run demo:new-ticket` in `orbit-backend/` first if you want to see the SSO outage appear in the review.
