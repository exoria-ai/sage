This article explains how to use Cowork, a research preview that brings Claude Code's agentic capabilities to Claude Desktop for knowledge work beyond coding.
Cowork is available as a research preview for Max plan subscribers using the Claude Desktop app on macOS. Users on other plans can join the waitlist for future access.
What is Cowork?

Cowork uses the same agentic architecture that powers Claude Code, now accessible within Claude Desktop and without opening the terminal. Instead of responding to prompts one at a time, Claude can take on complex, multi-step tasks and execute them on your behalf.
 
With Cowork, you can describe an outcome, step away, and come back to finished work—formatted documents, organized files, synthesized research, and more.
Important: Cowork is a research preview with unique risks due to its agentic nature and internet access. Please review Using Cowork Safely for more information.
 
Key capabilities

Direct local file access: Claude can read from and write to your local files without manual uploads or downloads.
Sub-agent coordination: Claude breaks complex work into smaller tasks and coordinates parallel workstreams to complete them.
Professional outputs: Generate polished deliverables like Excel spreadsheets with working formulas, PowerPoint presentations, and formatted documents.
Long-running tasks: Work on complex tasks for extended periods without conversation timeouts or context limits interrupting your progress.
 
 
How Cowork runs your tasks

Cowork runs directly on your computer, giving Claude access to the files you choose to share. Code runs safely in an isolated space, but Claude can make real changes to your files.
 
When you start a task in Cowork, Claude:
Analyzes your request and creates a plan.
Breaks complex work into subtasks when needed.
Executes work in a virtual machine (VM) environment.
Coordinates multiple workstreams in parallel if appropriate.
Delivers finished outputs directly to your file system.
You maintain visibility into what Claude is planning and doing throughout the process so you can steer when it matters, or let Claude run independently.
 
 
Getting Started

Requirements

Claude Desktop app: Cowork requires the desktop app for macOS and is not available on web or mobile.
Max plan subscription: This research preview is available to Max plan subscribers only.
Active internet connection: Required throughout the session.
Accessing Cowork

Open Claude Desktop for macOS.
Look for the mode selector that includes "Chat" and the Cowork tab.
Click the Cowork tab to switch modes to “Tasks”.
Describe the task you want Claude to complete.
Review Claude's approach, then let it run.
Note: The Claude Desktop app must remain open while Claude is working. If you close the app, your session will end.
 
What to expect during a task

When Claude is working on a task in Cowork:
Progress indicators show what Claude is doing at each step.
Transparency: Claude surfaces its reasoning and approach so you can follow along.
Steering: You can jump in to course-correct or provide additional direction mid-task.
Parallel work: For complex tasks, Claude may coordinate multiple sub-agents working simultaneously.
Tasks can run for extended periods depending on complexity. You can monitor progress or step away and return when Claude finishes.
 
 
Usage Limits

Working on tasks with Cowork consumes more of your usage allocation than chatting with Claude. This is because complex, multi-step tasks are compute-intensive and require more tokens to execute.
 
If you're on a Max plan and find yourself hitting usage limits frequently when using the Cowork research preview, consider:
Batching related work into single sessions.
Using standard chat for simpler tasks that don't require file access or extended execution.
Monitoring your individual usage in Settings > Usage.
See Usage Limit Best Practices for more information.
 
 
Example Use Cases

Cowork is designed for complex, multi-step work that benefits from file access and extended execution time. Here are some examples:
 
File and document management

Organize files: "Organize my Downloads folder by type and date" — Claude can sort hundreds of files into categorized folders.
Process receipts: Drop receipts in a folder and ask Claude to create a formatted expense report.
Batch rename: Rename files with consistent patterns like YYYY-MM-DD formatting.
Research and analysis

Research synthesis: Combine information from web searches, articles, papers, and notes into coherent reports or summaries.
Transcript analysis: Extract themes, key points, and action items from meeting notes, interviews, or lecture recordings.
Personal knowledge synthesis: Analyze your notes, journals, or research files to surface patterns, themes, and connections you might have missed.
Document creation

Spreadsheets with formulas: Generate Excel files with working VLOOKUP, conditional formatting, and multiple tabs—not just CSVs that need fixing.
Presentations: Create slide decks from rough notes or meeting transcripts.
Reports from messy inputs: Turn voice memos and scattered notes into polished documents.
Data and analysis

Statistical analysis: Outlier detection, cross-tabulation, and time-series analysis on your data files.
Data visualization: Generate charts using your data.
Data transformation: Clean, transform, and process datasets.
 
 
Permissions and Security

Cowork runs in a virtual machine (VM) on your computer. This provides several security benefits:
Controlled environment: Claude operates within defined boundaries, with controlled file and network access.
Isolation: The VM environment is separate from your main operating system.
Important: While the VM provides isolation, Claude does have access to local files you grant it permission to access. Review Claude's planned actions before allowing it to proceed, especially when working with sensitive files.
Permissions

Permissions work the same as for chat. You control:
Which MCPs you connect to Claude and how often they ask for permission.
Claude’s internet access
Please carefully assess how much you trust an MCP or website before extending access beyond Claude’s default settings.
 
 
Current Limitations

Cowork is a feature preview, which means some capabilities are not yet available:
No projects support: You cannot use Cowork within projects at this time.
No memory across sessions: Claude does not retain memory from previous Cowork sessions.
No chat or artifact sharing: Sessions cannot be shared with others.
Desktop for macOS only: Cowork is only available in the Claude Desktop app for macOS and does not sync across devices.
Session persistence: The desktop app must remain open for your session to continue. Closing the app ends the session.
We're iterating on Cowork based on feedback. If you encounter issues or have suggestions, use the feedback button in the app to share feedback with our team.
 
 
Troubleshooting

Claude stopped working on my task

Ensure the Claude Desktop app was open throughout the entire task. If the app was closed or your computer went to sleep, the session may have ended.
 
I'm hitting usage limits quickly

Cowork consumes more usage than standard chat. Try using standard chat for simpler tasks and reserve Cowork for complex, multi-step work that benefits from file access.
 
Files aren't appearing where expected

Check that you've granted Claude the appropriate file access permissions. Review the output location Claude specified when completing the task.