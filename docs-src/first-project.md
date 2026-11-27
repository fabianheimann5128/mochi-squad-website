---
title: Projects
summary: A project is a folder your agents work in. Add more, switch between them, or remove one.
app: 0.2.1
---

## What a project is

Every project is a folder on your Mac with its own coordinator, its own agents and its own team chat. Agents may read everything inside their project folder. Only agents you allow may write there. See [Access levels](access-levels.md).

## Switch, add or remove a project

Click the project name at the top of the chat list. The menu shows:

- your projects, with a tick next to the open one,
- **Add project folder …** to choose another folder,
- **Show in Finder** to open the current folder,
- **Remove project from Mochi Squad …**, when you have more than one project.

A new project gets its own coordinator as soon as you open it.

Removing a project removes its agents and their routines from Mochi Squad. The folder and the chat histories stay on your Mac.

## Which folders are allowed

Mochi Squad refuses folders where agents could reach your credentials or system files:

- your home folder itself, or any folder above it,
- `~/Library` and `~/Applications`,
- hidden folders in your home folder, such as `~/.ssh`, `~/.claude` or `~/.codex`.

Choose a folder inside your home folder instead, such as `~/Mochi Squad` or `~/Documents/My Project`.

> [!WARNING]
> Every agent can read the whole project folder. Do not keep secrets there, such as a `.env` file with production keys.
