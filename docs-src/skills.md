---
title: Skills
summary: Teach your agents how you want a kind of work done. Skills you already have are linked automatically.
app: 0.2.1
---

## What a skill is

A skill is a folder with a `SKILL.md` file: instructions, and sometimes scripts, for one kind of work. Your agents use a skill on their own when a task fits it. A skill works for Claude and Codex agents alike.

Open the list with the graduation cap in the icon bar (**Skills: what your agents know how to do**).

## Skills from Claude Code and Codex

Every skill in these folders appears by itself and stays up to date:

- `~/.claude/skills` (shown as **Claude Code**)
- `~/.codex/skills` and `~/.agents/skills` (shown as **Codex**)

Mochi Squad checks again when it starts, when you come back to the app (at most once a minute) and when you open the Skills window. A skill you changed there is copied again; one you deleted there disappears here too.

## Add your own

Drag a skill folder or a `.zip` onto the Skills window, or click **Add skill …**. A `SKILL.md` file on its own, or a `.skill` archive, works too.

- `SKILL.md` must start with a name and a description.
- A skill may be up to 50 MB and 2,000 files.
- Adding a skill with the same name replaces the old one and keeps who may use it. That is how you update one.

## Choose which agents get it

Each skill has a menu that says **All agents**, an agent's name, or how many agents have it. New skills go to all agents. Tick the agents that should have it; untick everyone for **No agent**.

## Hide or remove a skill

Click **…** next to a skill:

- For a linked skill: **Show in Finder** or **Don't use in Mochi Squad**. Hidden skills stay hidden until you click **Bring back … hidden** at the bottom of the window.
- For a skill you added: **Remove**. It is deleted at once, without asking.

## Find a skill

Type in **Search skills**. With skills from more than one place, filter by **All**, **Claude Code**, **Codex** or **Added by you**.

## Good to know

- An agent's briefing lists up to 150 skills.
- Agents cannot change the skills you added: they read a copy. An agent with full access could change that copy until the app rebuilds it.
- Links inside a skill that point outside its folder are left out.

> [!WARNING]
> Whatever a skill says, an agent that has it will try to do, within its rights. Use only skills from sources you trust.
