---
title: Routines
summary: Let an agent do a task on its own: at a time, every few hours, when a folder changes, on a keyword from your phone or from a start link.
app: 0.2.1
---

## Create a routine

1. Open the agent's chat and the **Routines** tab in the right column.
2. Click **New routine**.
3. Under **Task**, write what the agent should do each time.
4. Under **When**, choose what starts it (see below).
5. Tick the options you want.
6. Click **Create routine**.

A new routine is **Active** straight away. Click **Test run** to start it once now, even while it is paused.

The switch at the top pauses and resumes it. **Delete** removes it.

## When it starts

| Choice | What you set | Runs while the app is closed? |
|---|---|---|
| **At a time** | Hour, minute (in steps of 5) and the days. All days means daily. | Yes |
| **Every few hours** | Every 1, 2, 3, 4, 6 or 12 hours. | Yes |
| **When a folder changes** | A folder to watch. | Yes |
| **When I send a keyword** | One word, such as `#report`. | No, the app must be open |
| **With a start link** | Nothing; a link is made for you. | The link opens the app |

The first three are handed to the macOS scheduler, so they run even when Mochi Squad is closed.

### When a folder changes

macOS starts the routine as soon as something in the folder changes, at most every two minutes. The routine runs only when files really changed; hidden files are ignored. The first look only notes the current state.

### When I send a keyword {#keyword}

Write the keyword to your coordinator on [Telegram or WhatsApp](messengers.md), for example `#report what changed in the docs?`. The routine starts, and the rest of your message goes along as part of the task. You get *▶︎ Started: …* back, and later the result.

- A keyword is one word of up to 32 characters. The `#` is added for you.
- Each keyword belongs to one routine. Two routines cannot share one.
- It works for routines of the project your messenger is connected to.

### With a start link

The routine gets a link like `mochisquad://run?routine=…&key=…`. Click **Copy** and open it from Shortcuts, Raycast, a Stream Deck or a script. Add `&text=…` to give the run a task. See [Start links](start-links.md).

> [!WARNING]
> Anyone with the link can start the routine. Keep it to yourself. If it leaked, click **New link (the old one stops working)** and then **Save**.

## Options

- **Only tell me when there is something new.** The agent compares with its last run. If nothing is new, it stays silent: no notification, no message on your phone, no entry in the chat. The run log says *nothing new*.
- **May search the web and read pages.** Without this, the web tools are switched off for the routine.

## Where results go

- A **Mac notification** with the agent's name and the last lines of its answer.
- A **message on your phone**, if Telegram or WhatsApp is connected and the routine belongs to the messenger's project.
- The **agent's chat**: every run that was not silent appears there.
- The **Run log** below the form shows the last 10 runs: *done*, *nothing new*, *skipped* or *error*.

The agent is told that you are away. It does not ask questions and saves results as files in the project.

Results of runs that finished while the app was closed are delivered at the next launch: up to 5 from the past day.

## What a routine may do

- It always runs in the sandbox, with the agent's rights but never with full access or computer use.
- It loads no tool servers or hooks that a project brings along, because nobody is there to answer the trust question.
- It uses the agent's model and plan as they are now. Change the agent and the routine follows.
- The same routine never runs twice at once. A second start is *skipped*.
- A run is stopped after three hours.

## Limits

- **Keywords and start links need the app running.** A start link opens the app if it is closed; a keyword only works while the app is open.
- **A sleeping Mac runs nothing.** A closed MacBook on battery sleeps. See [Keeping the Mac awake](keep-awake.md).
- Removing an agent removes its routines.
- A routine of the coordinator runs as a plain agent, without the coordinator's tools.
