# Solutions

The end state of each hands-on video. Only the files that change are included.

Each folder builds on the ones before it. To jump to the end of any video, run this from the `starter-project` folder:

```bash
node solutions/catch-up.mjs 03_01
```

It copies every solution folder up to and including that video into `orbit-launch/`. Videos without a folder don't change any files, so use the closest earlier one.

| Folder | Video | What it adds |
|---|---|---|
| `02_01` | Turning a repeated workflow into a Skill | The `launch-risk-review` Skill and the shortened prompt |
| `03_01` | Connecting an agent to MCP tools and resources | `.mcp.json` pointing at the Orbit Labs server, and the Skill parked in `parked-skills/` for Chapter 3 |
| `04_01` | Adding Skills to an MCP-powered agent | Skill moved back into `.claude/skills/` and updated to gather live data through MCP |
| `04_02` | Building the final hybrid workflow | Skill updated to record High risks in the risk register |
