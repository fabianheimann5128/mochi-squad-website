---
title: Start links
summary: The exact format of a routine's start link, and how to open it from Shortcuts, Raycast or a script.
app: 0.2.1
---

## Format

```text
mochisquad://run?routine=<id>&key=<key>&text=<task>
```

| Part | What it is |
|---|---|
| `routine` | The routine's id, 8 characters. |
| `key` | A random key of 24 characters. Only a link with the right key starts the routine. |
| `text` | Optional. Your task for this run, URL-encoded, up to 2,000 characters. |

You never build the link yourself: choose **With a start link** in a [routine](routines.md) and click **Copy**.

## Open it

From Terminal or a script:

```bash
open "mochisquad://run?routine=ab12cd34&key=…&text=Check%20the%20inbox%20folder"
```

In Shortcuts, use the **Open URLs** action with the link. In Raycast, a Stream Deck or any launcher, add it as a link or URL.

If Mochi Squad is closed, the link opens it. When the run starts, you get the notification *Routine started from its link.* (not for quiet routines).

## What happens with a wrong link

A link with a wrong key, an unknown routine, or a paused routine does nothing. There is no error message.

## Safety

- Anyone with the link can start the routine, in the sandbox, with the text they add, and use up some of your plan by starting it again and again.
- Text from a link is handed to the agent as coming from an unknown sender: as information, not as instructions from you.
- If a link leaked, click **New link (the old one stops working)** in the routine, then **Save**.
