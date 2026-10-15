# Starter project

This is where you start the course.

| Folder | What it is |
|---|---|
| `orbit-launch/` | Your workspace. Open it in your AI agent. It starts with the original long prompt and the snapshot documents in `inputs/`. |
| `orbit-backend/` | Orbit Labs' company systems behind an MCP server. Install it once with `npm install`. You'll connect to it in Chapter 3. |
| `solutions/` | The end state of each hands-on video, plus `catch-up.mjs` to jump to any checkpoint. |

## Setup

```bash
cd orbit-backend
npm install
npm run check
cd ../orbit-launch
claude
```

## Catch up to a video

From this folder:

```bash
node solutions/catch-up.mjs 02_01
```

Available checkpoints: `02_01`, `03_01`, `04_01`, `04_02`. Videos without a checkpoint don't change any files, so use the closest earlier one.
