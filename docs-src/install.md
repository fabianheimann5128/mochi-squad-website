---
title: Download and install
summary: Get Mochi Squad onto your Mac. It takes a minute and needs no Terminal.
app: 0.2.1
---

## What you need

- A Mac with macOS 14 (Sonoma) or newer. Apple silicon and Intel both work.
- Claude Code with a Claude Pro or Max plan, or Codex with a ChatGPT Plus or Pro plan. One of the two is enough. Codex also comes with the ChatGPT app for Mac.
- Apple's command line tools. If they are missing, the app installs them for you on first launch.
- Only for WhatsApp: [Node.js](https://nodejs.org) 20 or newer.

Mochi Squad itself is free. It uses no API keys.

## Install

1. [Download Mochi Squad](https://github.com/fabianheimann5128/mochi-squad/releases/latest/download/MochiSquad.dmg). Older versions are on the [releases page](https://github.com/fabianheimann5128/mochi-squad/releases).
2. Open the disk image.
3. Drag **Mochi Squad** to **Applications**.
4. Open Mochi Squad from your Applications folder.

The disk image is signed with the maintainer's Developer ID and notarized by Apple, so macOS opens it without warnings about an unknown developer.

Next: [First launch](first-launch.md).

## Build it from source instead

If you prefer to build the app yourself, you need Apple's command line tools with Swift 6 or newer.

```bash
git clone https://github.com/fabianheimann5128/mochi-squad.git
cd mochi-squad
./setup.sh
```

`setup.sh` checks the requirements, builds the app, puts it into `~/Applications/Mochi Squad.app` and opens it. The first build takes a few minutes. To update, quit the app, pull, and run `./setup.sh` again.

> [!NOTE]
> A copy you built yourself does not look for updates. Only the signed download does.

## Uninstall

Quit the app and move it to the Trash. To also remove its data, follow [Resetting](data.md#resetting).
