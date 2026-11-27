---
title: First launch
summary: The first time you open Mochi Squad, it sets itself up in three short steps. Here is what each one asks.
app: 0.2.1
---

## Apple's command line tools

Mochi Squad's helpers run on the Python that comes with Apple's free command line tools. If your Mac does not have them, the first screen says so.

1. Click **Install command line tools**.
2. Follow the installer that macOS opens. It usually takes a few minutes.
3. Mochi Squad continues by itself once the tools are there.

If you closed Apple's window by mistake, click **Open the installer again**.

## Step 1: language and names

- Choose **English** or **Deutsch** at the top. You can change it later in [Settings](settings.md).
- **What is your name?** Your first name. Your agents use it when they talk about you. It is filled in from your Mac account.
- **What should your coordinator be called?** The default is Mochi.

Click **Continue**.

## Step 2: your first project

Agents always work in a folder: a code project, a collection of texts, whatever you like. Mochi Squad suggests `~/Mochi Squad` and creates it for you. Click the folder to choose another one.

Some folders are not allowed, such as your whole home folder or `~/Library`. See [Projects](first-project.md#which-folders-are-allowed).

Click **Continue**.

## Step 3: sign in with your subscription

You see one row for **Claude Code** and one for **Codex**. Each row shows its state:

| State | What to do |
|---|---|
| not installed | Click **Guide** to open the install page of that program. |
| installed · sign in with your … plan | Click **Sign in**. See [Signing in](sign-in.md). |
| signed in | Nothing. It is ready. |

One program is enough. While this step is open, Mochi Squad checks every few seconds, so a program you install or sign in to now shows up by itself. If only Codex is installed, your coordinator runs with Codex.

Leave **Keep Mochi Squad in the Dock** ticked if you want the icon to stay in your Dock. Then click **Let's go**.

## What you see next

The main window opens with your coordinator selected. From left to right:

- **The icon bar**: new agent, processes, connectors, skills, Mochi Memory, and at the bottom your plan usage, what's new, feedback and your initial for Settings.
- **The chat list**: the project menu at the top, the team chat, your agents and **More chats**.
- **The chat** with the selected agent.
- **The right column** with the tabs **Computer**, **Routines** and **Context**. It appears on wide windows; on narrow ones you open it on demand.

Next: [Meet your coordinator](meet-the-coordinator.md) or [create your first agent](first-agent.md).
