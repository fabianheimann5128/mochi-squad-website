---
title: Troubleshooting
summary: What to do when something does not work. Find your problem by the message you see.
app: 0.2.1
---

## Signing in

### The sign-in window does not finish

The window **Sign in to …** closes by itself only after the program confirmed the sign-in. If the browser did not open, or you closed it:

1. Click **Close**.
2. Click **Sign in** again.
3. If the program shows a code, paste it into the window.

### "… is waiting for you to sign in"

The agent's program is not signed in yet. Click **Open console** and sign in there with your subscription. If it says *Sign-in not confirmed*, close the session with **×** and send your message again.

### "Not logged in" in the console

The program lost its sign-in, for example because it expired or you signed out elsewhere. Open [Settings](settings.md): under **Agent programs** the row now says *installed · sign in with your … plan*. Click **Sign in**.

For an extra ChatGPT plan, sign in again next to that plan under **More ChatGPT plans**.

### "Claude Code is not installed on this Mac"

Install the program and start the session again. In Settings, **Guide** opens its install page. Mochi Squad finds it in the usual places, such as `~/.local/bin`, `/opt/homebrew/bin` and `/usr/local/bin`.

## Starting a session

### "… could not start"

The session ended before it could work. The card shows the program's last lines. Click **Open console** to read more. Common causes: the program needs an update, or it is not signed in.

### "8 sessions are already running"

At most 8 sessions run at the same time. End one under **Processes** in the icon bar.

### "This Codex version does not know permission profiles"

Mochi Squad checks before every launch that Codex enforces the sandbox. Update Codex and start the session again.

### "The tool servers of your Codex configuration could not be read"

Run `codex mcp list` in Terminal to see what is wrong with your Codex configuration, fix it, and start the session again.

### "The coordinator's tools are still starting"

Wait a few seconds and send the message again.

## Sandbox refusals

A sandboxed agent is meant to fail at some things. If an agent says it is not allowed to do something:

- **It cannot change a file in the project.** Its level is **Read only**. Switch it to **Edit in project**. See [Access levels](access-levels.md).
- **`git init`, `git remote add` or a change to `.git/config` fails.** The sandbox locks Git settings and hooks on purpose. Run the command yourself.
- **It cannot start a development server or run tests that open a port.** Local ports are closed. Start the server yourself, or give the agent full access for this.
- **It cannot read a file outside the project**, or in `~/.ssh`, `~/Library/Application Support` and similar places. That is the sandbox protecting your credentials.
- **The program asks you instead.** A card appears in the chat. Click **Allow** or **Deny**.

The refusal text comes from Claude Code or Codex, not from Mochi Squad.

## Routines

### A routine does not run on its own

- Check that it is **Active**.
- The Mac must be on and awake. A closed MacBook on battery sleeps. See [Keeping the Mac awake](keep-awake.md).
- If you see *macOS did not accept the schedule*, save the routine again. If that does not help, look into `~/Library/LaunchAgents`.
- **When I send a keyword** and **With a start link** do not use the scheduler. A keyword needs the app open; a link opens it.
- **When a folder changes** runs only when visible files changed, at most every two minutes. The first look only notes the state.
- **Only tell me when there is something new** stays silent when nothing changed. The run log then says *nothing new*.

### The run log says "skipped"

An earlier run of this routine was still working. The same routine never runs twice at once.

### The run log says "error"

Click the routine and read the last lines in the run log. *The routine was stopped after three hours* means it ran too long. *The client is not installed on this Mac* means the program is missing.

### A test run does nothing

If the routine is already running from its schedule, a test run does not start, and no message says so. Wait for the run to finish.

### A start link does nothing

A link with a wrong key, a paused routine or an old link (after **New link**) does nothing, without a message. Copy the link again from the routine.

## Messengers {#messengers}

### Telegram

| Message | What to do |
|---|---|
| *Telegram does not accept this token.* | Copy the token again from BotFather. |
| *Another program is already reading this bot.* | Create a new bot just for Mochi Squad. |
| *Telegram cannot be reached right now.* | Check your internet. Mochi Squad keeps trying. |
| *The link is valid for 15 minutes* has passed | Click **Expired: new link**. |
| *not connected right now* | Click **Manage**, then **Connect again**. |

Only the account you confirmed can write to the bot. Messages from other accounts and from groups are ignored.

### WhatsApp

| Message | What to do |
|---|---|
| *WhatsApp needs Node.js* | Install Node.js 20 or newer from nodejs.org, then click **Check again**. |
| *The WhatsApp library could not be downloaded.* | Check your internet and click **Try again**. |
| *npm could not be started.* | Reinstall Node.js; npm comes with it. |
| The code expired | It renews itself about every minute. Scan the newest one. |

Write in the *Message yourself* chat only. Other chats are ignored on purpose.

### No answer on the phone

- Mochi Squad must be open on your Mac, and the Mac awake.
- The messenger talks to the team chat of one project. Check **Team chat of** in Settings.
- Answers follow you for 30 minutes after your last phone message.
- The messenger reads text only. Pictures and files are not passed on.

## Operating the computer

### The agent cannot see the screen or click

macOS must allow Mochi Squad under **Accessibility** and **Screen Recording** in System Settings › Privacy & Security. Switch both on, then restart the session.

### Chrome does not connect

The Claude in Chrome extension must be installed in Google Chrome. If it does not connect the first time, quit and reopen Chrome once.

### "Switching on desktop control" fails

Claude Code enables its desktop control once per project. If the program first asks whether you trust the project folder, the automatic step stops, because that decision is yours. Answer the trust question in the chat, then end the session and start it again.

### Codex does not operate the computer

Codex's computer control comes with the ChatGPT app for Mac. Mochi Squad keeps it on only if it is the genuine, signed app in `/Applications`. Install or update the ChatGPT app.

## Dictation and attachments

- *Allow Mochi Squad to use the microphone and speech recognition*: switch both on in System Settings › Privacy & Security.
- *This project is read-only, so files cannot be attached*: the agent's level allows no writing in the project. Your text can still be sent.
- *… is larger than 100 MB and was not attached*: send a smaller file, or put it into the project yourself.

## Something else

- *Mochi Squad could not save your …*: check free disk space and the permissions of the app data folder. Mochi Squad keeps trying; the change is kept until you quit.
- *The list of your agents was damaged and has been backed up*: your routines are untouched, and agents that own routines were restored. Create the others again.

Still stuck? [Report a bug](feedback.md).
