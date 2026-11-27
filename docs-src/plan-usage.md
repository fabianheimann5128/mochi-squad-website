---
title: Plan usage
summary: See how much of your Claude and ChatGPT plans your agents used, and get a warning before a limit surprises you.
app: 0.2.1
---

## The gauge

The round gauge near the bottom of the icon bar shows the highest usage across all your plans. It changes colour from 80 % and again from 95 %.

Click it for **Plan usage**. For each plan (Claude, ChatGPT, and every extra ChatGPT plan) you see two bars, each with the time it starts over:

- **5 hours**: the five-hour limit,
- **Week**: the weekly limit.

## Warnings

At 80 % and again at 95 % of a limit you get a notice in the app, for example *Claude has used 80 % of its 5-hour limit. It starts over today at 14:00.* The same text goes to your phone if [Telegram or WhatsApp](messengers.md) is connected. Each warning comes once per limit period.

## Where the numbers come from

Mochi Squad reads what Claude Code and Codex report with their answers. It asks no server.

- Numbers appear after your agents' first answers.
- They are only as fresh as the last answer on that plan. *Has started over since; new numbers follow with the next answer* means the period ended after the last report.

The [Context tab](context-and-computer.md) of each agent also shows the 5-hour and weekly limit of its plan.

## Using less

- Choose a lighter model (Sonnet or Haiku) for simple agents. See [Agents](agents.md#models).
- [Tidy up long chats](tidy-up.md).
- Spread Codex agents over [several ChatGPT plans](chatgpt-plans.md).
