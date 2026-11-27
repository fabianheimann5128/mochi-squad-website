---
title: The coordinator and its tools
summary: What the coordinator can see and do through its built-in tools, and where its limits are.
app: 0.2.1
---

## Its tools

The coordinator talks to Mochi Squad through a small tool server on your Mac. It has seven tools:

| Tool | What it does |
|---|---|
| `list_projects` | Lists the project folders in Mochi Squad. |
| `overview` | Shows every project: agents, what they work on, open sessions, routines and the last routine runs. Read only. |
| `list_agents` | Lists the agents of one project. |
| `start_named_agent` | Gives a named agent a task. It continues the agent's open session or starts a new one. |
| `list_jobs` | Lists running sessions of all projects and their state. |
| `list_chats` | Lists the saved chats of a project. |
| `read_chat` | Reads the recent messages of a saved chat. |

A coordinator loads no other tool servers than this one.

## What you can ask it

- *What is everyone working on?*
- *Ask Otto to update the README, then tell me when it is done.*
- *What did the morning routine find?*
- *Read yesterday's chat with Mira and summarise it.*

## Limits

- It hands out at most 24 tasks per half hour and project, shared with the agents' own messages.
- It cannot give a task to an agent with full access or computer use unless it may do the same itself. It asks you to write to that agent directly.
- It does not create agents. If no fitting agent exists, it suggests that you create one.
- What it may do in files follows its own [access level](access-levels.md). By default it only reads.

## From your phone

A message from [Telegram or WhatsApp](messengers.md) reaches the coordinator of one project and nobody else, with the rights you gave it. Whoever has your unlocked phone can give it tasks, so choose its access level with that in mind.

## Security

Each coordinator session gets its own key for the tool server, made at its start and withdrawn at its end. The server only listens on your Mac and refuses requests from a browser. Details in [Security](security.md).
