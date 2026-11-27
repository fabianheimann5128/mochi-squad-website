---
title: Team chat and @mentions
summary: Write to the whole team in one place. A mention decides who answers.
app: 0.2.1
---

## Open the team chat

Click **Team** at the top of the chat list. It appears as soon as the project has an agent besides the coordinator.

## Who answers

| You write | Who answers |
|---|---|
| no mention | your coordinator |
| `@Mira` | the agent called Mira |
| `@all` | everyone in the project |

The chips above the input field insert a mention for you. Everyone in the team chat sees the recent conversation and can bring in colleagues on their own.

## How agents bring each other in

Agents can mention a colleague in the team chat, or send one a message with the [post command](post-command.md). The answer arrives as a new message in the sender's chat.

Some limits keep this from running in circles:

- At most 24 relays per half hour and project. Then the chat says *Pause: the agents reached the limit of 24 relays per half hour.*
- At most 8 sessions run at the same time.
- Agents cannot write to the coordinator. Only you can.
- A restricted agent cannot bring in an agent with full access or computer use. You can, with `@name`.

## Good to know

- A very long message is cut: agents receive its first 8,000 characters. Put longer material into a file in the project.
- Who wrote a line is tracked by the agent itself, not by its name, so renaming an agent moves no lines.
- Attachments go in an agent's own chat. See [Dictation and attachments](dictation-and-attachments.md).
