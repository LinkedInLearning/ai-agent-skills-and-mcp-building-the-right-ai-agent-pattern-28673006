---
name: launch-risk-review
description: Reviews product launch information (status updates, meeting notes, vendor emails, project data) and produces a launch risk report with severity, evidence, and next actions. Use when asked to review a launch, check launch readiness, prepare a go/no-go recommendation, or assess how an update affects the launch date.
---

# Launch risk review

Use this Skill to find risks to a product launch and report them the same way every time.

## Gather the information

If the `orbit` MCP server is available, use it as the source of truth:

1. Call `get_project` for the launch date and the review date.
2. Call `list_milestones` to see which milestones are at risk or not started.
3. Call `list_tasks` with `status: "blocked"`, then with `unassigned_only: true`. Read the notes on every task you return.
4. Call `search_tickets` with `status: "open"` and `min_days_open: 7`, then with `status: "open"` and `priority: "P1"`.

If the user also provides documents (status updates, notes, emails), use them for context, but treat live data as more current.

If the `orbit` server isn't available, review only the documents provided and say in the report that the data is a snapshot.

## Process

1. **Find the dates.** Identify the launch date and the date of the information you're reviewing. If the launch date isn't given, ask for it.
2. **Collect candidate risks.** Look for anything that could delay the launch or hurt launch quality: blocked or late work, slipping dependencies, unowned tasks, clusters of customer problems, and missing sign-offs.
3. **Apply the filters.** Drop anything listed under "What to ignore" in [rubric.md](rubric.md).
4. **Assign severity.** Use the rules in [rubric.md](rubric.md). When two rules apply, use the higher severity. Do the date math explicitly when deciding between High and Medium.
5. **Attach evidence.** Every risk needs at least one piece of evidence: a short quote from the source, or a task, ticket, or milestone ID. If you can't point to evidence, it isn't a finding.
6. **Write the report.** Follow [report-template.md](report-template.md) exactly. Keep the column names and order.
7. **Record High risks.** If the `orbit` server is available, record every High risk in the launch risk register (see below).

## Record High risks

The risk register is shared with the whole team, so keep it clean.

1. Call `list_risk_items` first. Skip any risk that's already recorded with the same underlying problem.
2. For each new High risk, call `create_risk_item` with the same title, evidence IDs, next action, and suggested owner you used in the report.
3. Don't record Medium or Low risks unless the user asks.
4. Finish the report with a "Recorded in risk register" line listing the new item IDs, or "No new items".

## Rules

- Don't invent dates, owners, or facts. If something important is missing, list it under "Missing information".
- Prefer the most recent source when two sources disagree, and mention the conflict in the evidence.
- Combine duplicates. Several tickets or notes about the same underlying problem are one risk with several pieces of evidence.
- Keep recommended actions specific and doable this week.
