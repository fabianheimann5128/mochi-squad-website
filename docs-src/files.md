---
title: Files the app writes
summary: Every file and folder Mochi Squad creates on your Mac, for when you want to look, back up or clean up.
app: 0.2.1
---

Folders are created readable only by you; settings files are written in one step, so a crash never leaves half a file.

## App data

In `~/Library/Application Support/Mochi Squad/`:

| File or folder | What it holds |
|---|---|
| `settings.json` | Your name, the coordinator's name, projects, language, extra plans, messengers, keep awake, memory folder |
| `agents.json` | Your agents. A damaged file is kept as `agents.damaged-<time>.json`. |
| `routines.json` | Your routines |
| `routine-runs.jsonl` | The run log of all routines |
| `routine-<id>.log` | What the scheduler reported for one routine |
| `routine-last/` | The last result of each routine, for "only tell me when there is something new" |
| `locks/` | Keeps a routine from running twice at once |
| `skills.json`, `skills-hidden.json`, `skills/` | Skills you added, who gets them, and hidden linked skills |
| `team/` | The team chats |
| `messengers/whatsapp/` | The WhatsApp helper, its library and your session |
| `sessions/` | What each running session may do. Emptied at every launch. |
| `accounts/codex/<plan>/` | Sign-in and histories of each extra ChatGPT plan |
| `computer-use.json` | Projects where desktop control is already switched on |
| `limits-claude.json`, `limits-codex*.json` | The last plan usage reported by each plan |

## Cache

In `~/Library/Caches/dev.mochisquad.app/`:

| Folder | What it holds |
|---|---|
| `bin/post` | The [post command](post-command.md), copied at every launch |
| `outbox/` | One outbox per session. Emptied at every launch. |
| `skills/` | The copy of your skills that agents read. Rebuilt at every launch. |

## Elsewhere

| Where | What |
|---|---|
| `~/Library/LaunchAgents/dev.mochisquad.app.routine.<id>.plist` | One schedule per routine that runs at a time, every few hours or on a folder change |
| `~/Mochi Memory/` | Your Mochi Memory notes, unless you chose another folder |
| `~/Mochi Squad/` | The first project, if you took the suggestion |
| `<project>/.mochi-squad/attachments/` | Files you attached to messages |
| Your macOS keychain | The Telegram bot token |

Claude Code and Codex write their own chat histories in `~/.claude` and `~/.codex`. Those belong to the programs, not to Mochi Squad.
