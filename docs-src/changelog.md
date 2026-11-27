---
title: Changelog
summary: What changed in each version of Mochi Squad. The app shows the same list under What's new?
app: 0.2.1
---

## 0.2.1

- **Tidy up long chats.** "Summarise and start fresh" in the context tab writes a short summary and continues in a fresh chat; suggested once the context fills up.
- **Start routines from your phone or a link.** Send a keyword such as #report on Telegram or WhatsApp, or open a routine's start link from Shortcuts, Raycast or a script; text you add goes along as the task.
- **Clear words on subscriptions.** The README explains what Anthropic and OpenAI say about using your own plan with Mochi Squad.
- **Mochi Memory.** Your agents remember lasting facts about you and your projects and know them from their next start. Plain notes you can correct in the app or open in Obsidian.
- **Plan usage at a glance.** A gauge in the left bar shows how much of your Claude and ChatGPT plans is used; at 80 % and 95 % you get a warning, also on your phone.
- **Routines that only speak up when it matters.** Run every few hours or when a folder changes, report as a notification and on Telegram or WhatsApp, and stay silent when nothing is new.
- **The Mac stays awake** while agents work; a setting keeps it awake all the time for a Mac that runs your team.
- **Context and Mac at a glance.** A ring chart shows what fills an agent's context; the computer tab shows processor, memory and temperature live.
- **Skills link themselves.** Every skill you have in Claude Code or Codex is there from the first launch and stays current; a new or changed skill shows up on its own.
- **Skills window, tidied.** Search, filter by where a skill comes from, one line per skill, and a menu to show it in Finder or leave it out.
- **Exact models.** Claude agents can use Fable 5.2, Opus 5.5, Sonnet 5.5 or Haiku 5.5; Codex models show their real names.
- **Long dictation.** Talking for a long time no longer loses the first sentences.
- **Cleaner chat list.** Times no longer wrap, and a job that repeats the name is left out.

## 0.2.0

- **Download and go.** Mochi Squad comes as a signed disk image for Apple silicon and Intel Macs; drag it to Applications and open it.
- **Updates built in.** The app looks for new versions once a day and installs them after asking; "Check for Updates…" is in the app menu.
- **Setup without Terminal.** If Apple's command line tools are missing, one click installs them and setup continues by itself.
- **English first.** English is now the main language; German can be chosen during setup and in Settings.
- **Agents speak your language.** They answer in the language you write to them, whatever the interface is set to.
- **Telegram.** Talk to your coordinator from your phone through your own bot.
- **WhatsApp.** Talk to your coordinator through the "Message yourself" chat (unofficial link, see the note in setup).
- **New icon bar.** New agent, processes, connectors, what's new, feedback and settings sit in one bar on the left.
- **Chats read better.** Lists with clean indentation, highlighted file names, shorter lines.
- **Skills.** Teach your agents how you want things done: add skills already on your Mac with one click or drop in a folder or .zip. They work for Claude and Codex agents.
- **The whole computer.** With "Operate computer", Claude agents now take over the screen in any app, not only Chrome; one-time notices of the client no longer leave a session waiting.
- **Coordinator with Codex.** The coordinator can run with Codex too, so one subscription is enough.
- **Routines you can rely on.** Schedule problems are shown, a routine never runs twice at once, and Codex runs appear in the agent's chat.
- **Fixes from an independent review.** Many corrections to rights, data safety and reliability (see SECURITY.md).

## 0.1.0

- Guided creation of agents: name, job, task, behaviour, provider and model, access
- Own Mochi characters with ears, hats, eyes and extras
- Three access levels per agent: read only, edit in project, full access
- Operate the computer: Codex controls apps and the browser, Claude the Chrome browser
- Several ChatGPT plans, selectable per agent
- Attach images and files, with a preview in the chat
- Dictate messages, with a level display
- Team chat: without a mention the coordinator answers, @all addresses everyone
- Change model and access right in the info column, restart the session with one click
- When closing, agents can keep running in the background
- Routines with test run and run log

The source is [CHANGELOG.md](https://github.com/fabianheimann5128/mochi-squad/blob/main/CHANGELOG.md) in the repository.
