---
title: Where your data is
summary: Mochi Squad keeps everything on your Mac and runs no server of its own. Here is what is stored where, what leaves your Mac, and how to reset.
app: 0.2.1
---

## What leaves your Mac

- **Your tasks and the files your agents read** go to Anthropic or OpenAI, through Claude Code or Codex, exactly as when you use those programs directly.
- **Dictation** stays on the Mac where macOS offers on-device recognition; otherwise Apple processes the audio.
- **Messengers**, if you connect them: what you write and what your team answers there travels through Telegram or WhatsApp.

## Where it is stored

| What | Where |
|---|---|
| Settings, agents, routines, team chat | `~/Library/Application Support/Mochi Squad/` |
| Chat histories of the agents | with Claude Code (`~/.claude`) or Codex (`~/.codex`) |
| Sign-in and histories of **extra** ChatGPT plans | `~/Library/Application Support/Mochi Squad/accounts/` |
| Sign-in of your main subscriptions | in the respective program; Mochi Squad stores no credentials of them |
| Mochi Memory | `~/Mochi Memory/` or the folder you chose, as Markdown notes |
| Skills you added | `~/Library/Application Support/Mochi Squad/skills/`, with a copy for the agents in `~/Library/Caches/dev.mochisquad.app/skills/` |
| Telegram bot token | in your macOS keychain |
| WhatsApp session | `~/Library/Application Support/Mochi Squad/messengers/` |
| Files you attach to a message | in the project, under `.mochi-squad/attachments` |
| Schedules of the routines | `~/Library/LaunchAgents/dev.mochisquad.app.routine.*.plist` |

**Show data in Finder** in [Settings](settings.md) opens the first folder. Every file is listed in [Files the app writes](files.md).

## Resetting

1. Unlink WhatsApp in Settings first, so the device disappears from your account. Remove Telegram there too, so its token leaves the keychain.
2. Quit Mochi Squad.
3. Delete the folder `~/Library/Application Support/Mochi Squad`.
4. If you created routines, delete the files `~/Library/LaunchAgents/dev.mochisquad.app.routine.*.plist`.

This removes settings, agents, routines and the team chat. It also removes the sign-ins **and chat histories of extra ChatGPT plans** and the WhatsApp session, because they live in that folder.

What stays: the histories of your main Claude and ChatGPT sign-ins, the files you attached in your projects, and your Mochi Memory notes.
