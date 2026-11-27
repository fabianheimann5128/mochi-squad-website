---
title: Telegram and WhatsApp
summary: Write to your coordinator from your phone. It knows what every agent is doing, hands out work and answers in the messenger.
app: 0.2.1
---

## How it works

Both are set up in [Settings](settings.md) under **Messengers**. A messenger connects your phone with the team chat of one project. You talk to the coordinator only; it reaches the other agents for you.

- Only the coordinator's answers and the app's notices go back to your phone. Other agents' lines stay in the app.
- Answers follow you for 30 minutes after your last message from the phone.
- Routine results, plan warnings and [keyword starts](routines.md#keyword) also reach your phone.
- With more than one project, choose which one under **Team chat of**.
- The messenger can read text only. Send pictures and files in the app.

Both need Mochi Squad open on your Mac, and the Mac awake.

## Telegram

Telegram uses a bot you create yourself. This is Telegram's official bot interface.

1. In Settings, click **Set up** next to Telegram.
2. Click **Open BotFather** and send `/newbot` there. Pick any name for your bot.
3. BotFather answers with a token. Paste it into **Bot token**; the whole reply works too. Click **Connect**.
4. Scan the code with your phone, or open the link on this Mac. The link is valid for 15 minutes.
5. Press **Start** in the chat with your bot.
6. The window shows your account. Click **Yes, link it**.

From now on only this account can write to your team. Messages from anyone else are ignored.

The token is kept in your Mac's keychain. Mochi Squad asks Telegram for new messages itself; there is no server and no public address.

To remove it: **Manage** › **Remove Telegram**. The token is deleted from the keychain. The bot itself stays at Telegram; you can delete it in BotFather.

## WhatsApp

WhatsApp links this Mac as a device of your own account, like WhatsApp Web, and uses only your *Message yourself* chat. All your other chats are neither read nor stored.

> [!WARNING]
> WhatsApp offers no official way to do this for private accounts. Mochi Squad connects through an unofficial library ([Baileys](https://github.com/WhiskeySockets/Baileys)). WhatsApp's terms do not allow that, and there is a small risk that WhatsApp blocks a number for it.

You need [Node.js](https://nodejs.org) 20 or newer.

1. In Settings, click **Set up** next to WhatsApp.
2. Click **Connect WhatsApp**. The first time, the library is downloaded once.
3. On your phone, open WhatsApp › **Settings** › **Linked devices** › **Link a device**.
4. Scan the code. It renews itself about every minute.
5. Open the *Message yourself* chat (your own number at the top of the chat list) and write there.

To remove it: **Manage** › **Unlink WhatsApp**. This Mac is removed from your linked devices and the stored session is deleted.

## Keep your phone locked

Whoever has your unlocked phone, or controls your Telegram or WhatsApp account, can give your coordinator tasks, with everything the coordinator is allowed to do. Keep that in mind when you choose its [access level](access-levels.md).

Problems connecting? See [Troubleshooting](troubleshooting.md#messengers).
