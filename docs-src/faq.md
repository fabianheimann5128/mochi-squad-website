---
title: FAQ
summary: Short answers to the questions people ask most.
app: 0.2.1
---

## Does Mochi Squad cost anything?

No. The app is free and open source under the Apache License 2.0. You need a Claude or ChatGPT plan for the agents to run on.

## Do I need an API key?

No. Mochi Squad uses Claude Code and Codex with the subscription you sign in with.

## Do I need both Claude and ChatGPT?

No. One is enough. Every agent, the coordinator included, can run on either.

## Is this allowed with my subscription?

See [Your subscription](subscriptions.md).

## Does Mochi Squad see my data?

No. It runs no server of its own. What your agents read goes to Anthropic or OpenAI through their own programs, as when you use them directly. See [Where your data is](data.md).

## Can agents break things on my Mac?

With **Read only** and **Edit in project** they work in a sandbox: they cannot write outside the project or read your credentials. With **Full access** they can do anything your user account can. See [Access levels](access-levels.md).

## How many agents can I have?

As many as you like. At most 8 sessions run at the same time.

## Do routines run when the app is closed?

Routines at a time, every few hours or on a folder change do. Keyword routines need the app open; a start link opens it. The Mac must be awake. See [Routines](routines.md).

## Does it work on Windows or Linux?

No. Mochi Squad is a Mac app for macOS 14 or newer.

## Which languages does it speak?

The interface comes in English and German. Agents answer in whatever language you write to them.

## Can I use it without internet?

No. The agents' models run at Anthropic or OpenAI.

## Can I see what an agent does?

Yes. Watch the [Computer tab](context-and-computer.md), or switch the chat to **Console** to see the real program.

## How do I update?

It updates itself, after asking. See [Updates](updates.md).

## How do I remove everything?

See [Resetting](data.md#resetting).
