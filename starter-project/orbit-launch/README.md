# Orbit Launch workspace

This is the folder you open in your AI agent (Claude Code, GitHub Copilot, Codex, or similar).

You're on the Orbit Labs team. Orbit 2.0 launches on **November 16, 2026**, and every week someone has to answer one question: *what could put this launch at risk?*

Follow along with the handout for each video.

## What's here

| Path | What it is |
|---|---|
| `prompts/weekly-review-prompt.md` | The original prompt-only version of the workflow |
| `inputs/` | Snapshots people would normally paste into a prompt: status updates, meeting notes, a vendor email |
| `reports/` | Where you save reports to compare later (videos 02_04, 03_02, and 03_03) |
| `.claude/skills/` | Empty for now. You'll build the `launch-risk-review` Skill here in Chapter 2 |
| `.mcp.json` | Doesn't exist yet. You'll create it in Chapter 3 to connect to Orbit Labs' systems |

The company systems live in `../orbit-backend`. Your agent only reaches them through MCP.

If you get stuck, run `node solutions/catch-up.mjs <video>` from the `starter-project` folder.
