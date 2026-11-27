---
title: Access levels and the sandbox
summary: Decide per agent what it may touch. Two levels run in a sandbox; full access is something you switch on deliberately.
app: 0.2.1
---

## The three levels

| Level | What the agent may do |
|---|---|
| **Read only** | Reads in the project and asks you in the chat when it needs more. This is the default. |
| **Edit in project** | Works in a sandbox that may only write inside the project. |
| **Full access** | No sandbox and no confirmations: it can read, change and delete every file and app on this Mac. |

Set the level when you create the agent, in **Edit agent** under **Rights**, or in the [Computer tab](context-and-computer.md) under **Access**.

## What the sandbox locks

With **Read only** and **Edit in project**, the agent runs in the sandbox of Claude Code or Codex. Mochi Squad sets it up so that:

- it cannot write outside the project, and with **Read only** not inside it either,
- it cannot change the program settings and Git hooks in the project (`.claude/`, `.codex/`, `.git/hooks/`, `.git/config`), so it cannot give itself more rights,
- it cannot read your credentials and other apps' data: `~/.ssh`, `~/.aws`, `~/.claude`, `~/.codex`, the keychain, `~/Library/Application Support`, browser and mail data and more,
- it cannot reach services on `localhost` or open ports,
- it cannot read your Mochi Memory folder directly,
- if the sandbox cannot start, the program quits instead of working unprotected.

When the program wants to do something that needs your OK, a card appears in the chat. See [Chat and console](chat.md#answering-questions).

## What the sandbox gets in the way of

These limits are on purpose, but they block some everyday things:

- **Git setup.** `git init` or `git remote add` fail, because they change `.git/config`. Run them yourself.
- **Local servers and tests that open a port.** A sandboxed agent cannot start a development server. Do that yourself, or give the agent full access for it.
- **Reading outside the project.** File tools only read the project. Commands in the sandbox can read outside it, except at the locked places.

## Full access

Full access turns all of the above off. Claude Code runs in `bypassPermissions` mode, Codex with `danger-full-access`. The agent can then read your credentials, change the app's data and plant things for other agents.

> [!WARNING]
> Use full access only for agents you trust completely, and not for agents that read foreign web pages or files. Routines never run with full access.

## Rights between agents

An agent with full access or computer use takes work only from you, or from a colleague who may do the same. A restricted agent cannot hand it a task, mention it into the team chat or send it agent post. An answer to someone who wrote within the last half hour is always possible.

Between **Read only** and **Edit in project** there is no such barrier.

## Web access

- In a chat, a Claude agent asks you before it searches the web or opens a page. A Codex agent has no web search unless it has full access.
- A routine may use the web only if you tick **May search the web and read pages**. See [Routines](routines.md).

The full model is in [Security](security.md).
