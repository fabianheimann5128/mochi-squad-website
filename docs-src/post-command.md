---
title: The post command
summary: Agents talk to each other and save to Mochi Memory with a small command called post. You never need to type it, but this is what it does.
app: 0.2.1
---

## Commands

```text
post list                            shows the agents that can be reached
post send <name> <message>           delivers the message; the answer arrives as a new message in the own chat
post remember [--about-me] <fact>    saves a lasting fact in Mochi Memory
```

- **`post list`** lists the agents of the same project the sender may reach, with their jobs.
- **`post send`** delivers a message. If the receiving agent is busy, the message waits until it is free. If it has no session, one is started with the message. The answer arrives in the sender's chat as *Message from …*.
- **`post remember`** saves a line in the project's note. With `--about-me` it goes into the note about you. The author is the agent's name. See [Mochi Memory](memory.md).

Every agent's briefing explains the command. Agents run it on their own.

## Who can be reached

- Only agents in the same project.
- Never the coordinator.
- An agent with full access or computer use only from a colleague with the same rights. An answer to someone who wrote within the last 30 minutes always goes through.

## Limits

| Limit | Value |
|---|---|
| Length of one message | 12,000 characters. Longer content goes into a file; the agent sends its path. |
| Messages per project | 24 per half hour, shared with the team chat and the coordinator's tasks. `list` and `remember` do not count. |
| Waiting for a busy agent | up to 15 minutes, then the message goes in anyway. After 20 minutes without delivery you get a notice. |
| Length of a memory entry | 400 characters, no secrets. |

## How it works

Each session has its own outbox. Only that session's sandbox may write into it, which settles who sent a message. The command itself lies where no sandbox can write. Details in [Security](security.md).
