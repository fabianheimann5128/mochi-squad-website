---
title: Several ChatGPT plans
summary: Add a second or third ChatGPT plan and choose per agent which one it works with. That spreads the usage.
app: 0.2.1
---

## Add a plan

1. Open [Settings](settings.md).
2. Under **More ChatGPT plans**, type a name, for example "Work".
3. Click **Add plan**. The sign-in opens at once; sign in with that plan's account.

Each plan shows *signed in* or *not signed in yet*.

## Choose a plan per agent

For a Codex agent, choose the plan under **ChatGPT plan** in **Edit agent** (or in the wizard). **Main plan** is the one you signed in to under **Agent programs**. The choice appears only once you added a plan.

The [plan usage](plan-usage.md) gauge shows each plan on its own.

## Remove a plan

Click the trash icon next to it and confirm **Remove plan and its chat histories**. Its running sessions are closed first. The sign-in and all chat histories of this plan are deleted from this Mac. Agents that used it then work with the main plan.

## Good to know

- Extra plans are for Codex only. Claude Code uses one sign-in.
- Each extra plan keeps its sign-in and histories in its own folder under `~/Library/Application Support/Mochi Squad/accounts/`. No agent can read it.
- Use plans that are yours. See [Your subscription](subscriptions.md).
