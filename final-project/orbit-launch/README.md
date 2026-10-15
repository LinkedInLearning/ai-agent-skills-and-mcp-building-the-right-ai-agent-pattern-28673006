# Orbit Launch workspace (completed)

The workspace as it looks at the end of the course.

| Path | What it is |
|---|---|
| `.claude/skills/launch-risk-review/` | The final Skill: process, data gathering, rubric, report template, and rules for recording High risks |
| `.mcp.json` | Connects the agent to the `orbit` MCP server in `../orbit-backend` |
| `prompts/weekly-review-prompt.md` | The one-line request that replaced the original prompt |
| `inputs/` | The snapshot documents from Chapter 2. The Skill falls back to them if the server isn't available |
| `reports/` | Where reports were saved for comparison during the course |

Start Claude Code in this folder, approve the `orbit` server, and send: `Do this week's launch review.`
