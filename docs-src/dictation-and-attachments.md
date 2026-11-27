---
title: Dictation and attachments
summary: Speak a message instead of typing it, and send images or files along.
app: 0.2.1
---

## Dictate

1. Click the microphone in the input field (**Dictate a message**).
2. Speak. A level display shows that it hears you.
3. Click it again (**Stop recording**), or just send.

The first time, macOS asks to allow Mochi Squad the microphone and speech recognition. If you said no, allow it in System Settings › Privacy & Security.

Recording ends when you send, when you press stop, and as soon as the app goes to the background. Dictation works in agent chats and in the team chat.

Where macOS offers on-device recognition, the audio stays on your Mac. Otherwise Apple processes it.

## Attach images and files

- Click the paperclip (**Attach images or files**), or drag files onto the input field.
- A preview appears above the field. The **×** on it removes the file again.
- Send as usual.

Attachments work in an agent's own chat.

## Where attachments go

Attached files are copied into the project, under `.mochi-squad/attachments`, and stay there. Every agent of the project can read them.

- A file may be up to 100 MB. Folders are not attached.
- In a read-only project, files cannot be attached. Your text can still be sent.
- If one of several files cannot be attached, none is.
- In the chat, a click opens an image. Other files are shown in Finder and never run.
