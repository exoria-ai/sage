# Agent Skills

Agent Skills are modular capabilities that extend Claude's functionality. Each Skill packages instructions, metadata, and optional resources (scripts, templates) that Claude uses automatically when relevant.

---

## Why use Skills

Skills are reusable, filesystem-based resources that provide Claude with domain-specific expertise: workflows, context, and best practices that transform general-purpose agents into specialists. Unlike prompts (conversation-level instructions for one-off tasks), Skills load on-demand and eliminate the need to repeatedly provide the same guidance across multiple conversations.

**Key benefits**:
- **Specialize Claude**: Tailor capabilities for domain-specific tasks
- **Reduce repetition**: Create once, use automatically
- **Compose capabilities**: Combine Skills to build complex workflows

<Note>
For a deep dive into the architecture and real-world applications of Agent Skills, read our engineering blog: [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
</Note>

## Using Skills

Anthropic provides pre-built Agent Skills for common document tasks (PowerPoint, Excel, Word, PDF), and you can create your own custom Skills. Both work the same way. Claude automatically uses them when relevant to your request.

**Pre-built Agent Skills** are available to all users on claude.ai and via the Claude API. See the [Available Skills](#available-skills) section below for the complete list.

**Custom Skills** let you package domain expertise and organizational knowledge. They're available across Claude's products: create them in Claude Code, upload them via the API, or add them in claude.ai settings.

<Note>
**Get started:**
- For pre-built Agent Skills: See the [quickstart tutorial](/docs/en/agents-and-tools/agent-skills/quickstart) to start using PowerPoint, Excel, Word, and PDF skills in the API
- For custom Skills: See the [Agent Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction) to learn how to create your own Skills
</Note>

## How Skills work

Skills leverage Claude's VM environment to provide capabilities beyond what's possible with prompts alone. Claude operates in a virtual machine with filesystem access, allowing Skills to exist as directories containing instructions, executable code, and reference materials, organized like an onboarding guide you'd create for a new team member.

This filesystem-based architecture enables **progressive disclosure**: Claude loads information in stages as needed, rather than consuming context upfront.

### Three types of Skill content, three levels of loading

Skills can contain three types of content, each loaded at different times:

### Level 1: Metadata (always loaded)

**Content type: Instructions**. The Skill's YAML frontmatter provides discovery information:

```yaml
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---
```

Claude loads this metadata at startup and includes it in the system prompt. This lightweight approach means you can install many Skills without context penalty; Claude only knows each Skill exists and when to use it.

### Level 2: Instructions (loaded when triggered)

**Content type: Instructions**. The main body of SKILL.md contains procedural knowledge: workflows, best practices, and guidance:

````markdown
# PDF Processing

## Quick start

Use pdfplumber to extract text from PDFs:

```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

For advanced form filling, see [FORMS.md](FORMS.md).
````

When you request something that matches a Skill's description, Claude reads SKILL.md from the filesystem via bash. Only then does this content enter the context window.

### Level 3: Resources and code (loaded as needed)

**Content types: Instructions, code, and resources**. Skills can bundle additional materials:

```
pdf-skill/
├── SKILL.md (main instructions)
├── FORMS.md (form-filling guide)
├── REFERENCE.md (detailed API reference)
└── scripts/
    └── fill_form.py (utility script)
```

**Instructions**: Additional markdown files (FORMS.md, REFERENCE.md) containing specialized guidance and workflows

**Code**: Executable scripts (fill_form.py, validate.py) that Claude runs via bash; scripts provide deterministic operations without consuming context

**Resources**: Reference materials like database schemas, API documentation, templates, or examples

Claude accesses these files only when referenced. The filesystem model means each content type has different strengths: instructions for flexible guidance, code for reliability, resources for factual lookup.

| Level | When Loaded | Token Cost | Content |
|-------|------------|------------|---------|
| **Level 1: Metadata** | Always (at startup) | ~100 tokens per Skill | `name` and `description` from YAML frontmatter |
| **Level 2: Instructions** | When Skill is triggered | Under 5k tokens | SKILL.md body with instructions and guidance |
| **Level 3+: Resources** | As needed | Effectively unlimited | Bundled files executed via bash without loading contents into context |

Progressive disclosure ensures only relevant content occupies the context window at any given time.

### The Skills architecture

Skills run in a code execution environment where Claude has filesystem access, bash commands, and code execution capabilities. Think of it like this: Skills exist as directories on a virtual machine, and Claude interacts with them using the same bash commands you'd use to navigate files on your computer.

![Agent Skills Architecture - showing how Skills integrate with the agent's configuration and virtual machine](/docs/images/agent-skills-architecture.png)

**How Claude accesses Skill content:**

When a Skill is triggered, Claude uses bash to read SKILL.md from the filesystem, bringing its instructions into the context window. If those instructions reference other files (like FORMS.md or a database schema), Claude reads those files too using additional bash commands. When instructions mention executable scripts, Claude runs them via bash and receives only the output (the script code itself never enters context).

**What this architecture enables:**

**On-demand file access**: Claude reads only the files needed for each specific task. A Skill can include dozens of reference files, but if your task only needs the sales schema, Claude loads just that one file. The rest remain on the filesystem consuming zero tokens.

**Efficient script execution**: When Claude runs `validate_form.py`, the script's code never loads into the context window. Only the script's output (like "Validation passed" or specific error messages) consumes tokens. This makes scripts far more efficient than having Claude generate equivalent code on the fly.

**No practical limit on bundled content**: Because files don't consume context until accessed, Skills can include comprehensive API documentation, large datasets, extensive examples, or any reference materials you need. There's no context penalty for bundled content that isn't used.

This filesystem-based model is what makes progressive disclosure work. Claude navigates your Skill like you'd reference specific sections of an onboarding guide, accessing exactly what each task requires.

### Example: Loading a PDF processing skill

Here's how Claude loads and uses a PDF processing skill:

1. **Startup**: System prompt includes: `PDF Processing - Extract text and tables from PDF files, fill forms, merge documents`
2. **User request**: "Extract the text from this PDF and summarize it"
3. **Claude invokes**: `bash: read pdf-skill/SKILL.md` → Instructions loaded into context
4. **Claude determines**: Form filling is not needed, so FORMS.md is not read
5. **Claude executes**: Uses instructions from SKILL.md to complete the task

![Skills loading into context window - showing the progressive loading of skill metadata and content](/docs/images/agent-skills-context-window.png)

The diagram shows:
1. Default state with system prompt and skill metadata pre-loaded
2. Claude triggers the skill by reading SKILL.md via bash
3. Claude optionally reads additional bundled files like FORMS.md as needed
4. Claude proceeds with the task

This dynamic loading ensures only relevant skill content occupies the context window.

## Where Skills work

Skills are available across Claude's agent products:

### Claude API

The Claude API supports both pre-built Agent Skills and custom Skills. Both work identically: specify the relevant `skill_id` in the `container` parameter along with the code execution tool.

**Prerequisites**: Using Skills via the API requires three beta headers:
- `code-execution-2025-08-25` - Skills run in the code execution container
- `skills-2025-10-02` - Enables Skills functionality
- `files-api-2025-04-14` - Required for uploading/downloading files to/from the container

Use pre-built Agent Skills by referencing their `skill_id` (e.g., `pptx`, `xlsx`), or create and upload your own via the Skills API (`/v1/skills` endpoints). Custom Skills are shared organization-wide.

To learn more, see [Use Skills with the Claude API](/docs/en/build-with-claude/skills-guide).

### Claude Code

[Claude Code](https://code.claude.com/docs/en/overview) supports only Custom Skills.

**Custom Skills**: Create Skills as directories with SKILL.md files. Claude discovers and uses them automatically.

Custom Skills in Claude Code are filesystem-based and don't require API uploads.

To learn more, see [Use Skills in Claude Code](https://code.claude.com/docs/en/skills).

### Claude Agent SDK

The [Claude Agent SDK](/docs/en/agent-sdk/overview) supports custom Skills through filesystem-based configuration.

**Custom Skills**: Create Skills as directories with SKILL.md files in `.claude/skills/`. Enable Skills by including `"Skill"` in your `allowed_tools` configuration.

Skills in the Agent SDK are then automatically discovered when the SDK runs.

To learn more, see [Agent Skills in the SDK](/docs/en/agent-sdk/skills).

### Claude.ai

[Claude.ai](https://claude.ai) supports both pre-built Agent Skills and custom Skills.

**Pre-built Agent Skills**: These Skills are already working behind the scenes when you create documents. Claude uses them without requiring any setup.

**Custom Skills**: Upload your own Skills as zip files through Settings > Features. Available on Pro, Max, Team, and Enterprise plans with code execution enabled. Custom Skills are individual to each user; they are not shared organization-wide and cannot be centrally managed by admins.

To learn more about using Skills in Claude.ai, see the following resources in the Claude Help Center:
- [What are Skills?](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Using Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [How to create custom Skills](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [Teach Claude your way of working using Skills](https://support.claude.com/en/articles/12580051-teach-claude-your-way-of-working-using-skills)

## Skill structure

Every Skill requires a `SKILL.md` file with YAML frontmatter:

```yaml
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
[Clear, step-by-step guidance for Claude to follow]

## Examples
[Concrete examples of using this Skill]
```

**Required fields**: `name` and `description`

**Field requirements**:

`name`:
- Maximum 64 characters
- Must contain only lowercase letters, numbers, and hyphens
- Cannot contain XML tags
- Cannot contain reserved words: "anthropic", "claude"

`description`:
- Must be non-empty
- Maximum 1024 characters
- Cannot contain XML tags

The `description` should include both what the Skill does and when Claude should use it. For complete authoring guidance, see the [best practices guide](/docs/en/agents-and-tools/agent-skills/best-practices).

## Security considerations

We strongly recommend using Skills only from trusted sources: those you created yourself or obtained from Anthropic. Skills provide Claude with new capabilities through instructions and code, and while this makes them powerful, it also means a malicious Skill can direct Claude to invoke tools or execute code in ways that don't match the Skill's stated purpose.

<Warning>
If you must use a Skill from an untrusted or unknown source, exercise extreme caution and thoroughly audit it before use. Depending on what access Claude has when executing the Skill, malicious Skills could lead to data exfiltration, unauthorized system access, or other security risks.
</Warning>

**Key security considerations**:
- **Audit thoroughly**: Review all files bundled in the Skill: SKILL.md, scripts, images, and other resources. Look for unusual patterns like unexpected network calls, file access patterns, or operations that don't match the Skill's stated purpose
- **External sources are risky**: Skills that fetch data from external URLs pose particular risk, as fetched content may contain malicious instructions. Even trustworthy Skills can be compromised if their external dependencies change over time
- **Tool misuse**: Malicious Skills can invoke tools (file operations, bash commands, code execution) in harmful ways
- **Data exposure**: Skills with access to sensitive data could be designed to leak information to external systems
- **Treat like installing software**: Only use Skills from trusted sources. Be especially careful when integrating Skills into production systems with access to sensitive data or critical operations

## Available Skills

### Pre-built Agent Skills

The following pre-built Agent Skills are available for immediate use:

- **PowerPoint (pptx)**: Create presentations, edit slides, analyze presentation content
- **Excel (xlsx)**: Create spreadsheets, analyze data, generate reports with charts
- **Word (docx)**: Create documents, edit content, format text
- **PDF (pdf)**: Generate formatted PDF documents and reports

These Skills are available on the Claude API and claude.ai. See the [quickstart tutorial](/docs/en/agents-and-tools/agent-skills/quickstart) to start using them in the API.

### Custom Skills examples

For complete examples of custom Skills, see the [Skills cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction).

## Limitations and constraints

Understanding these limitations helps you plan your Skills deployment effectively.

### Cross-surface availability

**Custom Skills do not sync across surfaces**. Skills uploaded to one surface are not automatically available on others:

- Skills uploaded to Claude.ai must be separately uploaded to the API
- Skills uploaded via the API are not available on Claude.ai
- Claude Code Skills are filesystem-based and separate from both Claude.ai and API

You'll need to manage and upload Skills separately for each surface where you want to use them.

### Sharing scope

Skills have different sharing models depending on where you use them:
- **Claude.ai**: Individual user only; each team member must upload separately
- **Claude API**: Workspace-wide; all workspace members can access uploaded Skills
- **Claude Code**: Personal (`~/.claude/skills/`) or project-based (`.claude/skills/`); can also be shared via Claude Code Plugins

Claude.ai does not currently support centralized admin management or org-wide distribution of custom Skills.

### Runtime environment constraints

The exact runtime environment available to your skill depends on the product surface where you use it.

 - **Claude.ai**:
    - **Varying network access**: Depending on user/admin settings, Skills may have full, partial, or no network access. For more details, see the [Create and Edit Files](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude#h_6b7e833898) support article.
- **Claude API**:
    - **No network access**: Skills cannot make external API calls or access the internet
    - **No runtime package installation**: Only pre-installed packages are available. You cannot install new packages during execution.
    - **Pre-configured dependencies only**: Check the [code execution tool documentation](/docs/en/agents-and-tools/tool-use/code-execution-tool) for the list of available packages
- **Claude Code**:
    - **Full network access**: Skills have the same network access as any other program on the user's computer
    - **Global package installation discouraged**: Skills should only install packages locally in order to avoid interfering with the user's computer

Plan your Skills to work within these constraints.

## Next steps

<CardGroup cols={2}>
  <Card
    title="Get started with Agent Skills"
    icon="graduation-cap"
    href="/docs/en/agents-and-tools/agent-skills/quickstart"
  >
    Create your first Skill
  </Card>
  <Card
    title="API Guide"
    icon="code"
    href="/docs/en/build-with-claude/skills-guide"
  >
    Use Skills with the Claude API
  </Card>
  <Card
    title="Use Skills in Claude Code"
    icon="terminal"
    href="https://code.claude.com/docs/en/skills"
  >
    Create and manage custom Skills in Claude Code
  </Card>
  <Card
    title="Use Skills in the Agent SDK"
    icon="cube"
    href="/docs/en/agent-sdk/skills"
  >
    Use Skills programmatically in TypeScript and Python
  </Card>
  <Card
    title="Authoring best practices"
    icon="lightbulb"
    href="/docs/en/agents-and-tools/agent-skills/best-practices"
  >
    Write Skills that Claude can use effectively
  </Card>
</CardGroup>


# Agent Skills

> Create, manage, and share Skills to extend Claude's capabilities in Claude Code.

This guide shows you how to create, use, and manage Agent Skills in Claude Code. For background on how Skills work across Claude products, see [What are Skills?](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview).

A Skill is a markdown file that teaches Claude how to do something specific: reviewing PRs using your team's standards, generating commit messages in your preferred format, or querying your company's database schema. When you ask Claude something that matches a Skill's purpose, Claude automatically applies it.

## Create your first Skill

This example creates a personal Skill that teaches Claude to explain code using visual diagrams and analogies. Unlike Claude's default explanations, this Skill ensures every explanation includes an ASCII diagram and a real-world analogy.

<Steps>
  <Step title="Check available Skills">
    Before creating a Skill, see what Skills Claude already has access to:

    ```
    What Skills are available?
    ```

    Claude will list any Skills currently loaded. You may see none, or you may see Skills from plugins or your organization.
  </Step>

  <Step title="Create the Skill directory">
    Create a directory for the Skill in your personal Skills folder. Personal Skills are available across all your projects. (You can also create [project Skills](#where-skills-live) in `.claude/skills/` to share with your team.)

    ```bash  theme={null}
    mkdir -p ~/.claude/skills/explaining-code
    ```
  </Step>

  <Step title="Write SKILL.md">
    Every Skill needs a `SKILL.md` file. The file starts with YAML metadata between `---` markers and must include a `name` and `description`, followed by Markdown instructions that Claude follows when the Skill is active.

    The `description` is especially important, because Claude uses it to decide when to apply the Skill.

    Create `~/.claude/skills/explaining-code/SKILL.md`:

    ```yaml  theme={null}
    ---
    name: explaining-code
    description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
    ---

    When explaining code, always include:

    1. **Start with an analogy**: Compare the code to something from everyday life
    2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
    3. **Walk through the code**: Explain step-by-step what happens
    4. **Highlight a gotcha**: What's a common mistake or misconception?

    Keep explanations conversational. For complex concepts, use multiple analogies.
    ```
  </Step>

  <Step title="Load and verify the Skill">
    Skills are automatically loaded when created or modified. Verify the Skill appears in the list:

    ```
    What Skills are available?
    ```

    You should see `explaining-code` in the list with its description.
  </Step>

  <Step title="Test the Skill">
    Open any file in your project and ask Claude a question that matches the Skill's description:

    ```
    How does this code work?
    ```

    Claude should ask to use the `explaining-code` Skill, then include an analogy and ASCII diagram in its explanation. If the Skill doesn't trigger, try rephrasing to include more keywords from the description, like "explain how this works."
  </Step>
</Steps>

The rest of this guide covers how Skills work, configuration options, and troubleshooting.

## How Skills work

Skills are **model-invoked**: Claude decides which Skills to use based on your request. You don't need to explicitly call a Skill. Claude automatically applies relevant Skills when your request matches their description.

When you send a request, Claude follows these steps to find and use relevant Skills:

<Steps>
  <Step title="Discovery">
    At startup, Claude loads only the name and description of each available Skill. This keeps startup fast while giving Claude enough context to know when each Skill might be relevant.
  </Step>

  <Step title="Activation">
    When your request matches a Skill's description, Claude asks to use the Skill. You'll see a confirmation prompt before the full `SKILL.md` is loaded into context. Since Claude reads these descriptions to find relevant Skills, [write descriptions](#skill-not-triggering) that include keywords users would naturally say.
  </Step>

  <Step title="Execution">
    Claude follows the Skill's instructions, loading referenced files or running bundled scripts as needed.
  </Step>
</Steps>

### Where Skills live

Where you store a Skill determines who can use it:

| Location   | Path                                             | Applies to                        |
| :--------- | :----------------------------------------------- | :-------------------------------- |
| Enterprise | See [managed settings](/en/iam#managed-settings) | All users in your organization    |
| Personal   | `~/.claude/skills/`                              | You, across all projects          |
| Project    | `.claude/skills/`                                | Anyone working in this repository |
| Plugin     | Bundled with [plugins](/en/plugins)              | Anyone with the plugin installed  |

If two Skills have the same name, the higher row wins: managed overrides personal, personal overrides project, and project overrides plugin.

### When to use Skills versus other options

Claude Code offers several ways to customize behavior. The key difference: **Skills are triggered automatically by Claude** based on your request, while slash commands require you to type `/command` explicitly.

| Use this                                 | When you want to...                                                        | When it runs                               |
| :--------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------- |
| **Skills**                               | Give Claude specialized knowledge (e.g., "review PRs using our standards") | Claude chooses when relevant               |
| **[Slash commands](/en/slash-commands)** | Create reusable prompts (e.g., `/deploy staging`)                          | You type `/command` to run it              |
| **[CLAUDE.md](/en/memory)**              | Set project-wide instructions (e.g., "use TypeScript strict mode")         | Loaded into every conversation             |
| **[Subagents](/en/sub-agents)**          | Delegate tasks to a separate context with its own tools                    | Claude delegates, or you invoke explicitly |
| **[Hooks](/en/hooks)**                   | Run scripts on events (e.g., lint on file save)                            | Fires on specific tool events              |
| **[MCP servers](/en/mcp)**               | Connect Claude to external tools and data sources                          | Claude calls MCP tools as needed           |

**Skills vs. subagents**: Skills add knowledge to the current conversation. Subagents run in a separate context with their own tools. Use Skills for guidance and standards; use subagents when you need isolation or different tool access.

**Skills vs. MCP**: Skills tell Claude *how* to use tools; MCP *provides* the tools. For example, an MCP server connects Claude to your database, while a Skill teaches Claude your data model and query patterns.

<Note>
  For a deep dive into the architecture and real-world applications of Agent Skills, read [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
</Note>

## Configure Skills

This section covers Skill file structure, supporting files, tool restrictions, and distribution options.

### Write SKILL.md

The `SKILL.md` file is the only required file in a Skill. It has two parts: YAML metadata (the section between `---` markers) at the top, and Markdown instructions that tell Claude how to use the Skill:

```yaml  theme={null}
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
Provide clear, step-by-step guidance for Claude.

## Examples
Show concrete examples of using this Skill.
```

#### Available metadata fields

You can use the following fields in the YAML frontmatter:

| Field            | Required | Description                                                                                                                                                                                                                                                                                       |
| :--------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`           | Yes      | Skill name. Must use lowercase letters, numbers, and hyphens only (max 64 characters). Should match the directory name.                                                                                                                                                                           |
| `description`    | Yes      | What the Skill does and when to use it (max 1024 characters). Claude uses this to decide when to apply the Skill.                                                                                                                                                                                 |
| `allowed-tools`  | No       | Tools Claude can use without asking permission when this Skill is active. Supports comma-separated values or YAML-style lists. See [Restrict tool access](#restrict-tool-access-with-allowed-tools).                                                                                              |
| `model`          | No       | [Model](https://docs.claude.com/en/docs/about-claude/models/overview) to use when this Skill is active (e.g., `claude-sonnet-4-20250514`). Defaults to the conversation's model.                                                                                                                  |
| `context`        | No       | Set to `fork` to run the Skill in a forked sub-agent context with its own conversation history.                                                                                                                                                                                                   |
| `agent`          | No       | Specify which [agent type](/en/sub-agents#built-in-subagents) to use when `context: fork` is set (e.g., `Explore`, `Plan`, `general-purpose`, or a custom agent name from `.claude/agents/`). Defaults to `general-purpose` if not specified. Only applicable when combined with `context: fork`. |
| `hooks`          | No       | Define hooks scoped to this Skill's lifecycle. Supports `PreToolUse`, `PostToolUse`, and `Stop` events.                                                                                                                                                                                           |
| `user-invocable` | No       | Controls whether the Skill appears in the slash command menu. Does not affect the [`Skill` tool](/en/slash-commands#skill-tool) or automatic discovery. Defaults to `true`. See [Control Skill visibility](#control-skill-visibility).                                                            |

See the [best practices guide](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices) for complete authoring guidance including validation rules.

### Update or delete a Skill

To update a Skill, edit its `SKILL.md` file directly. To remove a Skill, delete its directory. Changes take effect immediately.

### Add supporting files with progressive disclosure

Skills share Claude's context window with conversation history, other Skills, and your request. To keep context focused, use **progressive disclosure**: put essential information in `SKILL.md` and detailed reference material in separate files that Claude reads only when needed.

This approach lets you bundle comprehensive documentation, examples, and scripts without consuming context upfront. Claude loads additional files only when the task requires them.

<Tip>Keep `SKILL.md` under 500 lines for optimal performance. If your content exceeds this, split detailed reference material into separate files.</Tip>

#### Example: multi-file Skill structure

Claude discovers supporting files through links in your `SKILL.md`. The following example shows a Skill with detailed documentation in separate files and utility scripts that Claude can execute without reading:

```
my-skill/
├── SKILL.md (required - overview and navigation)
├── reference.md (detailed API docs - loaded when needed)
├── examples.md (usage examples - loaded when needed)
└── scripts/
    └── helper.py (utility script - executed, not loaded)
```

The `SKILL.md` file references these supporting files so Claude knows they exist:

````markdown  theme={null}
## Overview

[Essential instructions here]

## Additional resources

- For complete API details, see [reference.md](reference.md)
- For usage examples, see [examples.md](examples.md)

## Utility scripts

To validate input files, run the helper script. It checks for required fields and returns any validation errors:
```bash
python scripts/helper.py input.txt
```
````

<Tip>Keep references one level deep. Link directly from `SKILL.md` to reference files. Deeply nested references (file A links to file B which links to file C) may result in Claude partially reading files.</Tip>

**Bundle utility scripts for zero-context execution.** Scripts in your Skill directory can be executed without loading their contents into context. Claude runs the script and only the output consumes tokens. This is useful for:

* Complex validation logic that would be verbose to describe in prose
* Data processing that's more reliable as tested code than generated code
* Operations that benefit from consistency across uses

In `SKILL.md`, tell Claude to run the script rather than read it:

```markdown  theme={null}
Run the validation script to check the form:
python scripts/validate_form.py input.pdf
```

For complete guidance on structuring Skills, see the [best practices guide](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices#progressive-disclosure-patterns).

### Restrict tool access with allowed-tools

Use the `allowed-tools` frontmatter field to limit which tools Claude can use when a Skill is active. You can specify tools as a comma-separated string or a YAML list:

```yaml  theme={null}
---
name: reading-files-safely
description: Read files without making changes. Use when you need read-only file access.
allowed-tools: Read, Grep, Glob
---
```

Or use YAML-style lists for better readability:

```yaml  theme={null}
---
name: reading-files-safely
description: Read files without making changes. Use when you need read-only file access.
allowed-tools:
  - Read
  - Grep
  - Glob
---
```

When this Skill is active, Claude can only use the specified tools (Read, Grep, Glob) without needing to ask for permission. This is useful for:

* Read-only Skills that shouldn't modify files
* Skills with limited scope: for example, only data analysis, no file writing
* Security-sensitive workflows where you want to restrict capabilities

If `allowed-tools` is omitted, the Skill doesn't restrict tools. Claude uses its standard permission model and may ask you to approve tool usage.

<Note>
  `allowed-tools` is only supported for Skills in Claude Code.
</Note>

### Run Skills in a forked context

Use `context: fork` to run a Skill in an isolated sub-agent context with its own conversation history. This is useful for Skills that perform complex multi-step operations without cluttering the main conversation:

```yaml  theme={null}
---
name: code-analysis
description: Analyze code quality and generate detailed reports
context: fork
---
```

### Define hooks for Skills

Skills can define hooks that run during the Skill's lifecycle. Use the `hooks` field to specify `PreToolUse`, `PostToolUse`, or `Stop` handlers:

```yaml  theme={null}
---
name: secure-operations
description: Perform operations with additional security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/security-check.sh $TOOL_INPUT"
          once: true
---
```

The `once: true` option runs the hook only once per session. After the first successful execution, the hook is removed.

Hooks defined in a Skill are scoped to that Skill's execution and are automatically cleaned up when the Skill finishes.

See [Hooks](/en/hooks) for the complete hook configuration format.

### Control Skill visibility

Skills can be invoked in three ways:

1. **Manual invocation**: You type `/skill-name` in the prompt
2. **Programmatic invocation**: Claude calls it via the [`Skill` tool](/en/slash-commands#skill-tool)
3. **Automatic discovery**: Claude reads the Skill's description and loads it when relevant to the conversation

The `user-invocable` field controls only manual invocation. When set to `false`, the Skill is hidden from the slash command menu but Claude can still invoke it programmatically or discover it automatically.

To block programmatic invocation via the `Skill` tool, use `disable-model-invocation: true` instead.

#### When to use each setting

| Setting                          | Slash menu | `Skill` tool | Auto-discovery | Use case                                                        |
| :------------------------------- | :--------- | :----------- | :------------- | :-------------------------------------------------------------- |
| `user-invocable: true` (default) | Visible    | Allowed      | Yes            | Skills you want users to invoke directly                        |
| `user-invocable: false`          | Hidden     | Allowed      | Yes            | Skills that Claude can use but users shouldn't invoke manually  |
| `disable-model-invocation: true` | Visible    | Blocked      | Yes            | Skills you want users to invoke but not Claude programmatically |

#### Example: model-only Skill

Set `user-invocable: false` to hide a Skill from the slash menu while still allowing Claude to invoke it programmatically:

```yaml  theme={null}
---
name: internal-review-standards
description: Apply internal code review standards when reviewing pull requests
user-invocable: false
---
```

With this setting, users won't see the Skill in the `/` menu, but Claude can still invoke it via the `Skill` tool or discover it automatically based on context.

### Skills and subagents

There are two ways Skills and subagents can work together:

#### Give a subagent access to Skills

[Subagents](/en/sub-agents) do not automatically inherit Skills from the main conversation. To give a custom subagent access to specific Skills, list them in the subagent's `skills` field:

```yaml  theme={null}
# .claude/agents/code-reviewer.md
---
name: code-reviewer
description: Review code for quality and best practices
skills: pr-review, security-check
---
```

The full content of each listed Skill is injected into the subagent's context at startup, not just made available for invocation. If the `skills` field is omitted, no Skills are loaded for that subagent.

<Note>
  Built-in agents (Explore, Plan, general-purpose) do not have access to your Skills. Only custom subagents you define in `.claude/agents/` with an explicit `skills` field can use Skills.
</Note>

#### Run a Skill in a subagent context

Use `context: fork` and `agent` to run a Skill in a forked subagent with its own separate context. See [Run Skills in a forked context](#run-skills-in-a-forked-context) for details.

### Distribute Skills

You can share Skills in several ways:

* **Project Skills**: Commit `.claude/skills/` to version control. Anyone who clones the repository gets the Skills.
* **Plugins**: To share Skills across multiple repositories, create a `skills/` directory in your [plugin](/en/plugins) with Skill folders containing `SKILL.md` files. Distribute through a [plugin marketplace](/en/plugin-marketplaces).
* **Managed**: Administrators can deploy Skills organization-wide through [managed settings](/en/iam#managed-settings). See [Where Skills live](#where-skills-live) for managed Skill paths.

## Examples

These examples show common Skill patterns, from minimal single-file Skills to multi-file Skills with supporting documentation and scripts.

### Simple Skill (single file)

A minimal Skill needs only a `SKILL.md` file with frontmatter and instructions. This example helps Claude generate commit messages by examining staged changes:

```
commit-helper/
└── SKILL.md
```

```yaml  theme={null}
---
name: generating-commit-messages
description: Generates clear commit messages from git diffs. Use when writing commit messages or reviewing staged changes.
---

# Generating Commit Messages

## Instructions

1. Run `git diff --staged` to see changes
2. I'll suggest a commit message with:
   - Summary under 50 characters
   - Detailed description
   - Affected components

## Best practices

- Use present tense
- Explain what and why, not how
```

### Use multiple files

For complex Skills, use progressive disclosure to keep the main `SKILL.md` focused while providing detailed documentation in supporting files. This PDF processing Skill includes reference docs, utility scripts, and uses `allowed-tools` to restrict Claude to specific tools:

```
pdf-processing/
├── SKILL.md              # Overview and quick start
├── FORMS.md              # Form field mappings and filling instructions
├── REFERENCE.md          # API details for pypdf and pdfplumber
└── scripts/
    ├── fill_form.py      # Utility to populate form fields
    └── validate.py       # Checks PDFs for required fields
```

**`SKILL.md`**:

````yaml  theme={null}
---
name: pdf-processing
description: Extract text, fill forms, merge PDFs. Use when working with PDF files, forms, or document extraction. Requires pypdf and pdfplumber packages.
allowed-tools: Read, Bash(python:*)
---

# PDF Processing

## Quick start

Extract text:
```python
import pdfplumber
with pdfplumber.open("doc.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

For form filling, see [FORMS.md](FORMS.md).
For detailed API reference, see [REFERENCE.md](REFERENCE.md).

## Requirements

Packages must be installed in your environment:
```bash
pip install pypdf pdfplumber
```
````

<Note>
  If your Skill requires external packages, list them in the description. Packages must be installed in your environment before Claude can use them.
</Note>

## Troubleshooting

### View and test Skills

To see which Skills Claude has access to, ask Claude a question like "What Skills are available?" Claude loads all available Skill names and descriptions into the context window when a conversation starts, so it can list the Skills it currently has access to.

To test a specific Skill, ask Claude to do a task that matches the Skill's description. For example, if your Skill has the description "Reviews pull requests for code quality", ask Claude to "Review the changes in my current branch." Claude automatically uses the Skill when the request matches its description.

### Skill not triggering

The description field is how Claude decides whether to use your Skill. Vague descriptions like "Helps with documents" don't give Claude enough information to match your Skill to relevant requests.

A good description answers two questions:

1. **What does this Skill do?** List the specific capabilities.
2. **When should Claude use it?** Include trigger terms users would mention.

```yaml  theme={null}
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

This description works because it names specific actions (extract, fill, merge) and includes keywords users would say (PDF, forms, document extraction).

### Skill doesn't load

**Check the file path.** Skills must be in the correct directory with the exact filename `SKILL.md` (case-sensitive):

| Type       | Path                                                                    |
| :--------- | :---------------------------------------------------------------------- |
| Personal   | `~/.claude/skills/my-skill/SKILL.md`                                    |
| Project    | `.claude/skills/my-skill/SKILL.md`                                      |
| Enterprise | See [Where Skills live](#where-skills-live) for platform-specific paths |
| Plugin     | `skills/my-skill/SKILL.md` inside the plugin directory                  |

**Check the YAML syntax.** Invalid YAML in the frontmatter prevents the Skill from loading. The frontmatter must start with `---` on line 1 (no blank lines before it), end with `---` before the Markdown content, and use spaces for indentation (not tabs).

**Run debug mode.** Use `claude --debug` to see Skill loading errors.

### Skill has errors

**Check dependencies are installed.** If your Skill uses external packages, they must be installed in your environment before Claude can use them.

**Check script permissions.** Scripts need execute permissions: `chmod +x scripts/*.py`

**Check file paths.** Use forward slashes (Unix style) in all paths. Use `scripts/helper.py`, not `scripts\helper.py`.

### Multiple Skills conflict

If Claude uses the wrong Skill or seems confused between similar Skills, the descriptions are probably too similar. Make each description distinct by using specific trigger terms.

For example, instead of two Skills with "data analysis" in both descriptions, differentiate them: one for "sales data in Excel files and CRM exports" and another for "log files and system metrics". The more specific your trigger terms, the easier it is for Claude to match the right Skill to your request.

### Plugin Skills not appearing

**Symptom**: You installed a plugin from a marketplace, but its Skills don't appear when you ask Claude "What Skills are available?"

**Solution**: Clear the plugin cache and reinstall:

```bash  theme={null}
rm -rf ~/.claude/plugins/cache
```

Then restart Claude Code and reinstall the plugin:

```shell  theme={null}
/plugin install plugin-name@marketplace-name
```

This forces Claude Code to re-download and re-register the plugin's Skills.

**If Skills still don't appear**, verify the plugin's directory structure is correct. Skills must be in a `skills/` directory at the plugin root:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── my-skill/
        └── SKILL.md
```

## Next steps

<CardGroup cols={2}>
  <Card title="Authoring best practices" icon="lightbulb" href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices">
    Write Skills that Claude can use effectively
  </Card>

  <Card title="Agent Skills overview" icon="book" href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview">
    Learn how Skills work across Claude products
  </Card>

  <Card title="Use Skills in the Agent SDK" icon="cube" href="https://docs.claude.com/en/docs/agent-sdk/skills">
    Use Skills programmatically with TypeScript and Python
  </Card>

  <Card title="Get started with Agent Skills" icon="rocket" href="https://docs.claude.com/en/docs/agents-and-tools/agent-skills/quickstart">
    Create your first Skill
  </Card>
</CardGroup>


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://code.claude.com/docs/llms.txt