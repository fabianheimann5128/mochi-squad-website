---
title: Security model
summary: What Mochi Squad protects, what it does not, and how to report a vulnerability. The full text is in SECURITY.md.
app: 0.2.1
---

This page is a summary. The complete, binding description is [SECURITY.md](https://github.com/fabianheimann5128/mochi-squad/blob/main/SECURITY.md) in the repository.

## Report a vulnerability

Please do not open a public issue. Use **Report a vulnerability** under the *Security* tab of the [repository](https://github.com/fabianheimann5128/mochi-squad/security). You get an answer within a few days.

## In short

- **Sandbox by default.** Agents with **Read only** or **Edit in project** run in the sandbox of Claude Code or Codex. They cannot read your credentials, write outside the project, change program settings or Git hooks in the project, or reach local network ports. If the sandbox cannot start, the program quits.
- **Full access and computer use are opt-in.** They turn the protections off for that agent. Routines never get them.
- **Questions come to you.** When a program asks before acting, you decide with a card in the chat. Before an answer is sent, the app checks that the question is still the same.
- **No credentials.** Mochi Squad stores no passwords or tokens of your subscriptions. The Telegram token sits in your keychain.
- **Agents cannot reach the coordinator.** Only you can. Agents with more rights take work only from you or from equals.
- **The coordinator's tools** listen only on your Mac, with a key per session, and refuse requests from a browser.
- **Routines trust less.** They load no hooks or tool servers that a project brings along, and the web only if you allow it.
- **Memory cannot be used to steer.** Privileged agents receive only memory lines from you or from equally privileged agents.
- **Messengers reach the coordinator only**, from the one account or chat you paired.
- **Signed updates.** The download is signed and notarized. Updates install only with the project's signature and after asking you.

## Known limits

- **Prompt injection.** An agent that reads web pages or foreign files can follow instructions hidden in them. The rights limit the damage, but do not prevent it. Keep important projects under version control.
- **Reading in the project.** Every agent reads the whole project folder. Do not keep secrets there.
- **Your own tool servers** run outside the sandbox.
- **Foreign projects** can bring settings for Claude Code or Codex. Confirm the program's trust question only for projects whose origin you know.
- **The sandbox belongs to the program.** Its strength depends on the version of Claude Code or Codex.
- **No separation between macOS users.** Mochi Squad does not protect against other programs running under your user account.

The whole list, with the reasons, is in [SECURITY.md](https://github.com/fabianheimann5128/mochi-squad/blob/main/SECURITY.md#known-limits).
