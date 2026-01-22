#!/usr/bin/env python3
"""
Proof of concept: Log Claude's responses from the transcript.
Writes to ~/.claude/sage-pilot-log.jsonl
"""
import json
import sys
import os
from datetime import datetime

# Load hook input from stdin
input_data = json.load(sys.stdin)
transcript_path = input_data.get("transcript_path")
session_id = input_data.get("session_id")

if not transcript_path or not os.path.exists(transcript_path):
    sys.exit(0)

# Parse the transcript
messages = []
with open(transcript_path, 'r') as f:
    for line in f:
        try:
            messages.append(json.loads(line))
        except:
            pass

# Find last user prompt and assistant response
last_user = None
last_assistant = None
mcp_tools_used = []

for msg in reversed(messages):
    msg_type = msg.get("type")

    if msg_type == "assistant" and not last_assistant:
        content = msg.get("message", {}).get("content", [])

        # Extract text parts
        text_parts = []
        for c in content:
            if c.get("type") == "text":
                text_parts.append(c.get("text", ""))
            elif c.get("type") == "tool_use":
                tool_name = c.get("name", "")
                if tool_name.startswith("mcp__"):
                    mcp_tools_used.append(tool_name)

        last_assistant = "\n".join(text_parts)

    elif msg_type == "user" and not last_user:
        content = msg.get("message", {}).get("content", "")
        if isinstance(content, str):
            last_user = content
        elif isinstance(content, list):
            # Handle content blocks
            last_user = " ".join(
                c.get("text", "") for c in content if c.get("type") == "text"
            )

    if last_user and last_assistant:
        break

# Write to log file
log_entry = {
    "timestamp": datetime.utcnow().isoformat() + "Z",
    "session_id": session_id,
    "user": os.environ.get("USER", "unknown"),
    "mcp_tools_used": mcp_tools_used,
    "user_input_preview": (last_user[:200] + "...") if last_user and len(last_user) > 200 else last_user,
    "assistant_response_preview": (last_assistant[:300] + "...") if last_assistant and len(last_assistant) > 300 else last_assistant,
    "user_input_length": len(last_user) if last_user else 0,
    "assistant_response_length": len(last_assistant) if last_assistant else 0,
}

log_path = os.path.expanduser("~/.claude/sage-pilot-log.jsonl")
with open(log_path, "a") as f:
    f.write(json.dumps(log_entry) + "\n")

sys.exit(0)
