---
title: Chat and console
summary: Talk to an agent, answer its questions with a click, and look at the real program behind the chat when you want to.
app: 0.2.1
---

## Write to an agent

Click an agent in the chat list, type in **Message …** and press <kbd>⌘↩</kbd> or the send button. If no session is open, your message starts one; the agent continues its last chat.

While an agent works, the chat list shows *typing …* under its name and a dot on its Mochi. If it is still starting or waits for an answer, your text stays in the field until it can take it.

## Answering questions {#answering-questions}

Claude Code and Codex sometimes ask before they act. Mochi Squad shows the question as a card in the chat:

- ***… needs your permission***: read what is planned, then click **Allow** or **Deny**. Some questions offer more, such as **Allow and don't ask again** or **Always allow for this session**. The program's own wording is shown small below.
- ***… has a question***: choose one of the answers.
- ***…'s program shows a notice***: click **Continue**.

**View in the console** shows the question in the real program. Before an answer is sent, Mochi Squad checks that the program still shows the same question; if it changed, nothing is sent.

In the chat list, an agent that waits for you shows *✋ needs your answer*.

## The console

Every session runs in the real Claude Code or Codex program. Switch between **Chat** and **Console** in the chat header to see it. You can type in the console too, for example to sign in.

## End a session

Click **×** in the chat header (**End session**). The chat history is kept. The agent wakes up again with your next message.

All open sessions of all projects are listed under **Processes** in the icon bar. At most 8 sessions run at the same time.

## Earlier chats

- **Load earlier messages** at the top of a chat shows older messages.
- **More chats** at the bottom of the chat list holds older conversations: chats you [tidied up](tidy-up.md), older chats of an agent (each agent keeps its last 8 in its own chat), chats of removed agents, and chats you held in Claude Code or Codex outside Mochi Squad. Those can only be read here.
- The magnifying glass at the top of the chat list searches agents and chats.

## Quitting with open sessions

When you quit while sessions are open, Mochi Squad asks:

- **Keep running in the background**: the app stays open and is only hidden. Open sessions keep working, including those with full access. Click the Dock icon to bring it back.
- **Quit**: the sessions close; the chat histories are kept.
