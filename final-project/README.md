# Final project

This is the completed project as it looks at the end of the course. Use it to compare against your own work.

## What's different from the starter project

- `orbit-launch/.claude/skills/launch-risk-review/` holds the final Skill: `SKILL.md` (including the Gather the information and Record High risks sections), `rubric.md`, and `report-template.md`.
- `orbit-launch/.mcp.json` connects the agent to the `orbit` MCP server.
- `orbit-launch/prompts/weekly-review-prompt.md` is reduced to a one-line request.

`orbit-backend/` is identical to the starter project.

## Run it

```bash
cd orbit-backend
npm install
npm run reset
npm run demo:new-ticket
cd ../orbit-launch
claude
```

Approve the `orbit` server, then send:

```text
Do this week's launch review.
```

You should get an Off track report with four High risks (the PayGate slip, the unowned pen test, the duplicate charges, and the SSO outage), and four new items in the risk register. Run the same request again and the report ends with "No new items".
