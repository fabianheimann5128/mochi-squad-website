---
title: Mochi Memory
summary: Your agents remember lasting facts about you and your projects. You see every line, and you can correct or forget it.
app: 0.2.1
---

## How it works

1. An agent learns something while it works with you, for example how you like your answers or a decision in the project.
2. It saves that as a line in a note.
3. Every agent of the project knows it from its next start.

Open the memory with the brain in the icon bar (**Mochi Memory: what your agents remember**).

## What is in it

- **About you**: facts about you. Every agent in every project gets them.
- **Projects**: one note per project. Only that project's agents get it.

Each line shows who saved it and when: *Learned by Mira* or *Added by you*. Lines saved today are marked **new**.

## Add something yourself

Choose **About you** or a project, type in the field and click **Remember** (or press Return). One entry is one short sentence of up to 400 characters.

## Correct or forget

Click **…** next to a line:

- **Correct** lets you edit it. Click **Save**. The original author and date stay.
- **Forget** deletes the line at once, without asking.

Agents notice the change at their next start.

## Notes on your Mac, and Obsidian

The notes are plain Markdown files in `~/Mochi Memory`: one called *About me* and one per project. You can open and edit them in any editor.

- Click **Change folder …** to move them, for example into your Obsidian vault. If you pick the vault itself, Mochi Squad uses a folder *Mochi Squad* inside it. Only Mochi notes move; your other notes stay where they are.
- **Open in Obsidian** appears when Obsidian is installed. It opens the note if the folder is inside a vault, otherwise the folder in Finder.

Each line in a note looks like `- text · author · 2026-11-27`.

## What agents receive

- Memory goes into an agent's briefing when its session starts, marked as information and not as instructions, with who saved each line.
- An agent that can do more than others (full access, computer use, or the coordinator) gets only what you wrote and what agents with the same reach saved. That way a restricted agent that read a hostile web page cannot steer a privileged one through memory.
- Per note, the newest 60 lines (up to 6,000 characters) go into the briefing.
- Sandboxed agents cannot read or write the memory folder directly. They save through the app.

## Secrets

Text that looks like a password, key or token is refused. A line like that written by hand stays in the note, is marked **not given to agents** and never goes into a briefing. This is pattern matching and does not catch everything, so do not put secrets there yourself.

> [!WARNING]
> Anyone and any program that can write to the memory folder can change what your agents believe. Keep it in a place only you use.

There is no switch to turn Mochi Memory off. Agents are told to save only what will still matter in a week, and never passwords, keys or private details of other people.
