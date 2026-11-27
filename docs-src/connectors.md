---
title: Connectors
summary: Connectors are services (MCP servers) your agents may use. You see and add them in Mochi Squad; they live in Claude Code or Codex.
app: 0.2.1
---

## Open the list

Click the puzzle piece in the icon bar (**Connectors: services your agents may use**), or **Manage connectors** in the [Context tab](context-and-computer.md). Switch between **Claude Code** and **Codex** at the top.

Each connector shows its state: *connected*, *sign-in needed* (with **Sign in**), *switched off*, *status unknown* or *not reachable*.

## Add a connector

Under **Add server**, enter a **Name** and the address (`https://…`), then click **Add**. Only HTTPS addresses, or local HTTP addresses without credentials, are accepted.

Connectors are set up in the program itself, so they also apply when you use Claude Code or Codex outside Mochi Squad.

## Who can use them

- **Claude agents** can use your Claude Code connectors in a chat. Their tools ask before they run.
- **Codex agents** get your Codex connectors only with full access.
- **The coordinator** uses only Mochi Squad's own tools.
- **Routines** load no connectors.

> [!WARNING]
> Connectors run outside the sandbox. Add only services you trust.
