---
title: Operating the computer
summary: Let an agent take over screen, mouse and keyboard, or your browser. Off by default, on for one agent at a time.
app: 0.2.1
---

## Switch it on

In **Edit agent**, turn on **May operate the computer (screen, apps and browser)**. You find the same switch as **Operate computer** in the [Computer tab](context-and-computer.md).

## What the agent gets

- **Claude Code agents** get Claude Code's desktop control (screenshots, mouse and keyboard in any app) and control Chrome through the Claude in Chrome extension.
- **Codex agents** keep Codex's computer control for screen, apps and browser.

## The first time with Claude

- Claude Code keeps its desktop control off until it is enabled once per project. Mochi Squad does that for you before the first such session, in a short session of its own that sends nothing to the model. The console says *Switching on desktop control for this project*.
- macOS asks once to allow Mochi Squad under **Accessibility** and **Screen Recording** in System Settings › Privacy & Security.
- Chrome is opened for you if it is installed. If the extension does not connect the first time, quit and reopen Chrome once.

## The first time with Codex

Codex's computer control comes with the ChatGPT app for Mac. Mochi Squad keeps it on only if it is the genuine one: inside the ChatGPT app, signed by OpenAI.

## What to keep in mind

> [!WARNING]
> These tools work outside the sandbox. What the agent does through the screen or the browser is not bound by the file limits, and in the browser it acts with your sign-ins.

- The agent is told to use it only when you ask, and never to send, buy or delete anything through it without your OK.
- An agent that may operate the computer takes work only from you or from colleagues with the same rights.
- Routines never operate the computer.
