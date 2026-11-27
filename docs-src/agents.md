---
title: Agents
summary: Change what an agent is, what it does and which model it thinks with. Or remove it.
app: 0.2.1
---

## Edit an agent

Open the agent's chat and click **Edit agent** in the header. You can change:

| Field | What it means |
|---|---|
| **Name** | How you address it in the team chat. Must be unique in the project. |
| **Job** | Its job title, shown next to the name. The coordinator's job is fixed. |
| **Tasks** | What it should do and what it should watch out for. |
| **Character** | Optional keywords on tone and way of working. |
| **Provider** | **Anthropic · Claude Code** or **OpenAI · Codex**. |
| **Model** | The model and the reasoning depth. |
| **ChatGPT plan** | Only for Codex agents, when you added [more ChatGPT plans](chatgpt-plans.md). |
| **Rights** | **Read only**, **Edit in project** or **Full access**. See [Access levels](access-levels.md). |
| **Computer** | Whether it may operate the computer. See [Operating the computer](computer-use.md). |

Click **Save**.

Name, job, tasks and character go into the agent's briefing each time its program starts.

## Models {#models}

**Claude Code agents** can use:

- **Fable 5.2**, the most capable,
- **Opus 5.5**, a strong all-rounder,
- **Sonnet 5.5** and **Haiku 5.5**, faster and lighter on your plan,
- **Opus**, **Sonnet** or **Haiku** "always the newest", which follow the newest model of that family.

**Codex agents** show the models your Codex installation reports, under their real names. If Codex does not know its models yet (right after installing it), the agent uses Codex's own default.

### Reasoning depth

Next to the model you choose how hard the agent thinks. **Reasoning depth: automatic** leaves it to the program.

- Claude models offer **low**, **medium**, **high**, **xhigh** and **max**. Haiku has no choice.
- Codex models offer the levels the model reports.

Deeper thinking is slower and uses more of your plan.

## The look

In **Edit agent**, the dice button gives the Mochi a random look. The brush button opens the parts one by one: **Body**, **Head**, **Eyes**, **Extra** and **Colour**.

## Changes while a session runs

What an agent is set to is fixed when its session starts. If you change it while a session runs, the chat says *The running session still works with the old settings.* Click **Restart session** to apply the change. Codex starts a new chat on restart.

Taking rights away is the exception: the running session ends at once, so the lower rights apply immediately.

You can also switch the model, the access level and **Operate computer** right in the [Computer tab](context-and-computer.md).

## Remove an agent

In **Edit agent**, click the trash icon and confirm **Remove agent**. Its routines are removed with it. Its chat histories stay under **More chats**. The coordinator cannot be removed.
