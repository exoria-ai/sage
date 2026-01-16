Getting Started
Introduction
Raindrop is the monitoring platform for AI agents. Similar to how Sentry tracks errors in your web apps, Raindrop discovers silent agent failures in production.

Raindrop Signals Dashboard
AI agents fail differently than traditional software. A 500 error is obvious. An agent that confidently gives wrong information, forgets something the user said 3 messages ago, or takes a suboptimal path are failures invisible to traditional monitoring.
Raindrop helps you:
Detect issues automatically: default signals catch common failure modes like forgetting, user frustration, and task failures
Search across millions of interactions: Use Deep Search to find specific issues in your production data with natural language
Track custom signals: Define any signal you care about (eg. syntax errors, aesthetic complaints, agent stuck in a loop) and track it at scale
A/B test your agents: Run experiments to validate that your fixes actually worked
​
Integrate Raindrop
TypeScript
Full-featured SDK with tracing support for Node.js and edge runtimes.
Python
Native Python SDK for FastAPI, Django, and other Python frameworks.
HTTP API
RESTful API for any language or platform.
Vercel AI SDK
Automatic instrumentation for Vercel AI SDK users (Beta).
​
Core Features
Signals
Ground truth indicators for agent performance. Track wins, failures, and custom behaviors across all your interactions.
Deep Search
Find issues in your production data using natural language. Like deep research, but for your agent logs.
Experiments
A/B test your agents to validate changes. Compare models, prompts, and configurations.
Alerts
Get notified via Slack when issues spike. Daily summaries and custom alert thresholds.

SDK
TypeScript
The Raindrop SDK allows you to track user events and AI interactions in your app. This documentation provides a brief overview of how to use the TypeScript SDK.

​
Installation
Install with your package manager of choice:

npm

yarn

pnpm

bun
npm install raindrop-ai
import { Raindrop } from "raindrop-ai";

// Replace with the key from your Raindrop dashboard
const raindrop = new Raindrop({ writeKey: RAINDROP_API_KEY });
​
Quick-start: the Interaction API
The new interaction workflow is a three-step pattern:
begin() - creates an interaction object and logs the initial user input.
Update - optionally call setProperty, setProperties, or addAttachments.
finish() - records the AI’s final output and closes the interaction.
Using Vercel AI SDK? If you’re using the Vercel AI SDK, you can use our easy integration here to automatically track AI events and traces. It is currently in beta and we’d love your feedback while we continue to improve the experience!
​
Example: chat completion with the ai SDK
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai'
import { randomUUID } from "crypto";
import { Raindrop } from "raindrop-ai";

const raindrop = new Raindrop({ writeKey: RAINDROP_API_KEY });

const message = "What is love?"
const eventId = randomUUID() // generate your own ID so you can correlate logs

// 1. Start the interaction
const interaction = raindrop.begin({
  eventId,
  event: "chat_message",
  userId : "user_123",
  input: message,
  model: "gpt-4o",
  convoId: "convo_123",
  properties: {
    tool_call: "reasoning_engine",
    system_prompt: "you are a helpful...",
    experiment: "experiment_a",
  },
});

const { text } = await generateText({
  model: openai("gpt-4o"),
  prompt: message
})

// 3. Finish and ship the event
interaction.finish({
  output: text,
});
​
Updating an interaction
You can update an interaction at any time using setProperty, setProperties, or addAttachments.
interaction.setProperty("stage", "embedding");
interaction.addAttachments([
  {
    type: "text",
    name: "Additional Info",
    value: "A very long document",
    role: "input",
  },
  { type: "image", value: "https://example.com/image.png", role: "output" },
  {
    type: "iframe",
    name: "Generated UI",
    value: "https://newui.generated.com",
    role: "output",
  },
]);
​
Resuming an interaction
If you don’t have access to the interaction object that was returned from begin(), you can resume an interaction by calling resumeInteraction().
const interaction = raindrop.resumeInteraction(eventId);
Interactions are subject to the global 1 MB event limit; oversized payloads will be truncated. Contact us if you have custom requirements.
​
Single-shot tracking (legacy trackAi)
If your interaction is atomic (e.g. “user asked, model answered” in one function) you can still call trackAi() directly:
raindrop.trackAi({
  event: "user_message",
  userId: "user123",
  model: "gpt-4o-mini",
  input: "Who won the 2023 AFL Grand Final?",
  output: "Collingwood by four points!",
  properties: {
    tool_call: "reasoning_engine",
    system_prompt: "you are a helpful...",
    experiment: "experiment_a",
  },
});
Heads‑up: We recommend migrating to begin() → finish() for all new code so you gain partial‑event buffering, tracing helpers, and upcoming features such as automatic token counts.
​
Tracking Signals (feedback)
Signals capture explicit or implicit quality ratings on an earlier AI event. Use trackSignal() with the same eventId you used in begin() or trackAi().
Parameter	Type	Description
eventId	string	The ID of the AI event you’re evaluating
name	"thumbs_up", "thumbs_down", string	Name of the signal (e.g. "thumbs_up")
type	"default", "feedback", "edit"	Optional, defaults to "default"
comment	string	For feedback signals
after	string	For edit signals – the user’s final content
sentiment	"POSITIVE", "NEGATIVE"	Indicates whether the signal is positive (default is NEGATIVE)
…others		See API reference
// User clicks a thumbs‑down button
await raindrop.trackSignal({
  eventId: "my_event_id",
  name: "thumbs_down",
  comment: "Answer was off-topic",
});
​
Attachments
Attachments allow you to include context from the user or that the model outputted. These could be documents, generated images, code, or even an entire web page. They work the same way in begin() interactions and in single‑shot trackAi calls.
Each attachment is an object with the following properties:
type (string): The type of attachment. Can be “code”, “text”, “image”, or “iframe”.
name (optional string): A name for the attachment.
value (string): The content or URL of the attachment.
role (string): Either “input” or “output”, indicating whether the attachment is part of the user input or AI output.
language (optional string): For code attachments, specifies the programming language.
interaction.addAttachments([
  {
    type: "code",
    role: "input",
    language: "typescript",
    name: "example.ts",
    value: "console.log('hello');",
  },
  {
    type: "text",
    name: "Additional Info",
    value: "Some extra text",
    role: "input",
  },
  { type: "image", value: "https://example.com/image.png", role: "output" },
  { type: "iframe", value: "https://example.com/embed", role: "output" },
]);
Supported types: code, text, image, iframe.
​
Identifying users
raindrop.setUserDetails({
  userId: "user123",
  traits: {
    name: "Jane",
    email: "jane@example.com",
    plan: "pro",
    os: "macOS",
  },
});
​
PII redaction
Read more on how Raindrop handles privacy and PII redaction here. Note that this doesn’t apply to beta features like tracing. You can enable client-side PII redaction when initializing the Analytics class like so:
new Raindrop({
  writeKey: RAINDROP_API_KEY,
  redactPii: true,
});
​
Error Handling
If an error occurs while sending events to Raindrop, an exception will be raised. Make sure to handle exceptions appropriately in your application.
​
Configuration & helpers
Debug logs – debugLogs: true prints every queued event.
Disabled – disabled: true completely disables event sending and tracing (useful for dev/test).
Closing – call await raindrop.close() before your process exits to flush buffers.
new Raindrop({
  writeKey: RAINDROP_API_KEY,
  debugLogs: process.env.NODE_ENV !== "production",
  disabled: process.env.NODE_ENV === "test",
});
​
AI Tracing (Beta)
AI tracing is currently in beta. We’d love your feedback while we continue to improve the experience!
AI tracing allows you to track detailed AI pipeline execution, capturing step-by-step information of complex multi-model interactions or chained prompts. This helps you:
Visualize the full execution flow of your AI application
Debug and optimize complex prompt chains
Understand intermediate steps that led to a specific generated output
​
Getting Started with Tracing
Use withSpan or withTool on an interaction and any LLM calls inside are automatically captured.
import { Raindrop } from "raindrop-ai";

const raindrop = new Raindrop({ writeKey: RAINDROP_API_KEY });

// Tracing works automatically - LLM calls are captured
const interaction = raindrop.begin({ ... });
await interaction.withSpan({ name: "my_task" }, async () => {
  // Any LLM calls here are automatically traced
});
Next.js users: Add raindrop-ai to serverExternalPackages in your config:
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['raindrop-ai'],
}
 
module.exports = nextConfig
​
Explicit Module Instrumentation
In some environments, automatic instrumentation of AI libraries may not work correctly due to module loading order or bundler behavior. You can use the instrumentModules option to explicitly specify which modules to instrument.
Important for Anthropic users: You must use a module namespace import (import * as ...) for Anthropic, not the default export. See the example below.
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import * as AnthropicModule from "@anthropic-ai/sdk";  // Module namespace import required!
import { Raindrop } from "raindrop-ai";

const raindrop = new Raindrop({
  writeKey: RAINDROP_API_KEY,
  instrumentModules: {
    openAI: OpenAI,
    anthropic: AnthropicModule,  // Pass the module namespace, NOT the default export
  },
});
Pass the module constructors or namespaces you want to instrument. Supported modules include openAI, anthropic, cohere, bedrock, google_vertexai, google_aiplatform, pinecone, together, langchain, llamaIndex, chromadb, qdrant, and mcp.
​
Using withSpan for Task Tracing (Beta)
The withSpan method allows you to trace specific tasks or operations within your AI application. This is especially useful for tracking LLM requests. Any LLM call within the span will be automatically tracked, no further work required.
// Basic task tracing
const result = await interaction.withSpan(
  { name: "generate_response" },
  async () => {
    // Task implementation
    return "Generated response";
  }
);

// Task with properties and input parameters
const result = await interaction.withSpan(
  {
    name: "embedding_generation",
    properties: { model: "text-embedding-3-large" },
    inputParameters: ["What is the weather today?"]
  },
  async () => {
    // Generate embeddings
    return [0.1, 0.2, 0.3, 0.4];
  }
);
​
Parameters
Parameter	Type	Description
name	string	Name of the task for identification in traces
properties	Record<string, string> (optional)	Key-value pairs for additional metadata
inputParameters	unknown[] (optional)	Array of input parameters for the task
​
Using withTool for Tool Tracing (Beta)
The withTool method allows you to trace any actions your agent takes. This could be as simple as saving or retrieving a memory, or using external services like web search or API calls. Tracing these actions helps you understand your agent’s behavior and what led up to the agent’s response.
// Basic tool usage
const result = await interaction.withTool(
  { name: "search_tool" },
  async () => {
    // Call to external API or service
    return "Search results";
  }
);

// Tool with properties and input parameters
const result = await interaction.withTool(
  {
    name: "calculator",
    properties: { operation: "multiply" },
    inputParameters: { a: 5, b: 10 }
  },
  async () => {
    // Tool implementation
    return "Result: 50";
  }
);
​
Parameters
Parameter	Type	Description
name	string	Name of the tool for identification in traces
version	number (optional)	Version number of the tool
properties	Record<string, string> (optional)	Key-value pairs for additional metadata
inputParameters	Record<string, any> (optional)	Record of input parameters for the tool
traceContent	boolean (optional)	Flag to control whether content is traced
suppressTracing	boolean (optional)	Flag to suppress tracing for this tool invocation
​
Using with Existing OpenTelemetry Setup
If you already have an OpenTelemetry setup (e.g., Sentry, Datadog, Honeycomb), you can integrate Raindrop alongside your existing tracing infrastructure using useExternalOtel.
When useExternalOtel: true:
Raindrop won’t create its own OpenTelemetry SDK (avoids conflicts with your setup)
You add Raindrop’s span processor to your existing NodeSDK
LLM calls and withSpan/withTool traces are sent to both Raindrop and your existing backend
import { NodeSDK } from "@opentelemetry/sdk-node";
import * as AnthropicModule from "@anthropic-ai/sdk";  // Use namespace import for instrumentation
import Anthropic from "@anthropic-ai/sdk";
import { Raindrop } from "raindrop-ai";

// 1. Create Raindrop with useExternalOtel
const raindrop = new Raindrop({
  writeKey: RAINDROP_API_KEY,
  useExternalOtel: true,
  instrumentModules: { anthropic: AnthropicModule },  // Optional - specify modules to instrument
});

// 2. Create NodeSDK with Raindrop's processor and instrumentations
const sdk = new NodeSDK({
  spanProcessors: [
    raindrop.createSpanProcessor(),  // → Sends traces to Raindrop
    sentryProcessor,                  // → Your existing processor (Sentry, Datadog, etc.)
  ],
  instrumentations: raindrop.getInstrumentations(),  // AI library instrumentations
});
sdk.start();

// 3. Create AI clients AFTER SDK starts (required for instrumentation)
const anthropic = new Anthropic({ apiKey: "..." });

// 4. Use Raindrop normally - LLM input/output is captured!
const interaction = raindrop.begin({
  eventId: "my-event",
  event: "chat_request",
  userId: "user_123",
  input: "Hello!",
});

await interaction.withSpan({ name: "generate_response" }, async () => {
  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 100,
    messages: [{ role: "user", content: "Hello!" }],
  });
  return response;
});

interaction.finish({ output: "Response from Claude" });
​
Key Methods
Method	Description
createSpanProcessor()	Returns a span processor that sends traces to Raindrop. Add this to your NodeSDK’s spanProcessors array.
getInstrumentations()	Returns pre-configured OpenTelemetry instrumentations for AI libraries (Anthropic, OpenAI, Cohere, etc.). Add these to your NodeSDK’s instrumentations array.
If you don’t specify instrumentModules, getInstrumentations() returns instrumentations for all supported AI libraries. Specify instrumentModules to only instrument specific libraries.

SDK
Python
The Raindrop SDK allows you to track user events and AI interactions in your app. This documentation provides a brief overview of how to use the Python SDK.

​
Installation
To use the Raindrop SDK, start by installing with pip:
pip install raindrop-ai
​
Configuration
First, import the SDK and initialize it with your write key. You’ll see your write key when you log into app.raindrop.ai.
import os
import raindrop.analytics as raindrop

# Recommended: load from env var
raindrop.init(os.getenv("RAINDROP_WRITE_KEY") or "YOUR_WRITE_KEY")

# Optional: enable tracing integration for task/tool decorators
# raindrop.init("YOUR_WRITE_KEY", tracing_enabled=True)
​
Tracking AI Interactions
To track AI interactions, you can use the track_ai function. It takes the following parameters:
user_id (str): The unique identifier of the user.
event (str): The name of the AI event you want to track.
event_id (Optional[str]): A unique identifier for this specific event. If not provided, a UUID will be generated.
model (Optional[str]): The name of the AI model used.
input (Optional[str]): The input provided to the AI model. (Either this or output is required if AI data is logged)
output (Optional[str]): The output generated by the AI. (Either this or input is required if AI data is logged)
convo_id (Optional[str]): The conversation ID associated with the interaction. Helpful in AI apps with multiple conversations per user (e.g. ChatGPT).
properties (Optional[Dict[str, Any]]): Additional properties associated with the AI event.
timestamp (Optional[str]): An ISO 8601 formatted timestamp for the event. If not provided, the SDK generates a UTC timestamp.
attachments (Optional[List[Attachment]]): A list of attachments associated with the event. See the Attachments section below.
Example usage:
raindrop.track_ai(
    user_id="user123",
    event="user_message",
    model="gpt_4",
    input="What is the weather like today?",  # this or output is required
    output="The weather is sunny and warm.",  # this or input is required
    convo_id="conv789",  # optional
    properties={
        "system_prompt": "you are a helpful...",
        "experiment": "experiment_a",
    },
    attachments=[
        {
            "type": "text",
            "name": "Additional Info",
            "value": "A very long document",
            "role": "input",
        },
        {
            "type": "image",
            "value": "https://example.com/image.png",
            "role": "output",
        },
        {
            "type": "iframe",
            "name": "Generated UI",
            "value": "https://newui.generated.com",
            "role": "output",
        },
    ],
)
​
Attachments
Attachments allow you to include context from the user (e.g. an attached image), or stuff that the model outputted (whether that is an image, document, code, or even an entire web page).
Each attachment is an object with the following properties:
type (string): The type of attachment. Can be “code”, “text”, “image”, or “iframe”.
name (optional string): A name for the attachment.
value (string): The content or URL of the attachment.
role (string): Either “input” or “output”, indicating whether the attachment is part of the user input or AI output.
language (optional string): For code attachments, specifies the programming language.
Example of different attachment types:
attachments = [
    {
        "type": "code",
        "name": "Example Code",
        "value": "console.log('Hello, World!');",
        "role": "input",
        "language": "javascript",
    },
    {
        "type": "text",
        "name": "Additional Info",
        "value": "Some extra text",
        "role": "input",
    },
    {"type": "image", "value": "https://example.com/image.png", "role": "output"},
    {"type": "iframe", "value": "https://example.com/embed", "role": "output"},
]
Each event has a limit of 1 MB. Properties will be truncated for larger events. Contact us if you have custom requirements.
​
Identifying Users
To associate traits with users, you can use the identify function. It takes the following parameters:
user_id (str): The unique identifier of the user.
traits (Dict[str, Union[str, int, bool, float]]): The traits associated with the user.
Example usage:
raindrop.identify(
    user_id="user123",
    traits={
        "name": "John Doe",
        "email": "john@example.com",
        "age": 30,
        "plan": "paid" #we recommend 'free', 'paid', 'trial'
    }
)
​
Partial Event Tracking (Interactions)
For multi-turn conversations or when event data arrives incrementally, you can use the begin() and Interaction object to send partial updates.
​
begin()
Starts or resumes an interaction and returns an Interaction helper object.
user_id (str): The user’s identifier.
event (str): The name of the event.
event_id (Optional[str]): A unique ID for the event. If not provided, one is generated.
properties (Optional[Dict[str, Any]]): Initial properties for the event.
input (Optional[str]): Initial input for the AI.
attachments (Optional[List[Attachment]]): Initial attachments.
convo_id (Optional[str]): Conversation ID.
interaction = raindrop.begin(
    user_id="user456",
    event="chatbot_session_started",
    input="Hello chatbot!"
)
# interaction.id contains the event_id
​
resume_interaction()
If you already have an event_id for an ongoing interaction, you can get an Interaction object:
interaction = raindrop.resume_interaction(event_id="existing_event_id")
​
Interaction Object Methods
The Interaction object has the following methods to update the event:
interaction.set_input(text: str): Updates the AI input.
interaction.add_attachments(attachments: List[Attachment]): Adds more attachments.
interaction.set_properties(props: Dict[str, Any]): Merges new properties with existing ones.
interaction.set_property(key: str, value: str): Convenience for setting a single property.
interaction.finish(output: Optional[str] = None, **extra): Marks the interaction as complete.
output: The final AI output.
**extra: Any other top-level TrackAIEvent fields to update (e.g., properties, attachments).
The SDK automatically sends updates to the backend after a short period of inactivity or when finish() is called.
Example usage:
# Start an interaction
interaction = raindrop.begin(user_id="user789", event="code_generation", input="Write a python function for fibonacci")

# ... later, user adds more context
interaction.add_attachments([{"type": "text", "value": "It should be recursive", "role": "input"}])

# ... AI generates output
interaction.finish(output="def fib(n): if n <= 1: return n else: return fib(n-1) + fib(n-2)")
​
Tracking Signals
Signals are used to attach user feedback (such as thumbs down or thumbs up) or other labels to existing events. Use the track_signal function:
event_id (str): The ID of the event to attach the signal to.
name (str): Name of the signal (e.g., “thumbs_up”, “copied_code”).
signal_type (Literal[“default”, “feedback”, “edit”]): Type of signal. Defaults to "default".
For "feedback" signals, a "comment" string must be included in the properties.
For "edit" signals, an "after" string (representing the content after edit) must be included in the properties.
timestamp (Optional[str]): ISO 8601 formatted timestamp. Defaults to current UTC time.
properties (Optional[Dict[str, Any]]): Additional properties for the signal.
attachment_id (Optional[str]): ID of a specific attachment within the original event to associate this signal with.
sentiment (Optional[Literal[“POSITIVE”, “NEGATIVE”]]): Optional sentiment indicating whether the signal is positive or negative.
comment (Optional[str]): Convenience parameter for feedback signals. If provided, it’s added to properties as {"comment": "your comment"}.
after (Optional[str]): Convenience parameter for edit signals. If provided, it’s added to properties as {"after": "new content"}.
Example usage:
# Example: Tracking a thumbs-up signal
raindrop.track_signal(
    event_id="evt_abc123", # ID of the event being signaled
    name="thumbs_up",
    signal_type="default",
    sentiment="POSITIVE"
)

# Example: Tracking a thumbs-down signal
raindrop.track_signal(
    event_id="evt_abc123", # ID of the event being signaled
    name="thumbs_down",
    signal_type="default",
    sentiment="NEGATIVE"
)

# Example: Tracking feedback
raindrop.track_signal(
    event_id="evt_abc123",
    name="user_feedback",
    signal_type="feedback",
    comment="The AI's response was very helpful!"
)
​
Timestamp
For functions like track_ai and track_signal, you can optionally provide a timestamp parameter (an ISO 8601 formatted string) if you need to specify a custom time for the event. If not provided, the SDK generates a UTC timestamp at the moment of the call.
​
Flushing Events
The Raindrop SDK uses a buffering mechanism to efficiently send events in batches. The events are automatically flushed when the buffer reaches a certain size or after a specified timeout.
You can manually flush the events by calling the flush function. Make sure this happens before the process exits or you will lose events:
raindrop.flush()
​
Shutting Down
To ensure all events are processed before your application exits, call the shutdown function:
raindrop.shutdown()
This will also flush any pending partial events from interactions.
​
Error Handling
The SDK will retry a request up to 3 times. Failed requests will be logged, regardless of if debug_logs is true.
​
Configuration
The SDK has several configurable parameters:
max_queue_size: Maximum number of events to store in the buffer (default: 10_000)
upload_size: Number of events to send in a single API request (default: 10)
upload_interval: Time interval in seconds between automatic flushes (default: 1.0). You can modify these parameters if needed:
raindrop.max_queue_size = 20_000
raindrop.upload_size = 200
raindrop.upload_interval = 2.0
​
Debugging
If you want to enable debug logs to see the events being added to the buffer, you can use the set_debug_logs function:
raindrop.set_debug_logs(True)
That’s it! You should be ready to go. Please let us know if you have any questions.
​
Tracing (Beta)
Tracing is currently in beta. We’d love your feedback as we continue to improve the experience. Email: founders@raindrop.ai
Enable tracing by passing tracing_enabled=True to raindrop.init(...).
Decorate your entry-point function with @raindrop.interaction.
Decorate tool functions with @raindrop.tool.
The example below traces OpenAI tool calls. It enables tracing, decorates a tool, starts an interaction with begin(...), and finishes it later via resume_interaction().
import json
import os
from openai import OpenAI
import raindrop.analytics as raindrop

@raindrop.tool("get_current_weather")
def get_current_weather(location: str, unit: str = "celsius"):
    """Mock weather tool."""
    return {"location": location, "temperature": 22, "unit": unit}

def send_to_user(text: str) -> None:
    # Resume the current interaction from the tracing context and finish elsewhere
    raindrop.resume_interaction().finish(output=text)
    print(f"Sending to user: {text}")

@raindrop.interaction("weather_interaction")
def main() -> None:
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    # Create an interaction for observability (begin → finish)
    interaction = raindrop.begin(
        user_id="user-001",
        event="weather_query",
        input="What's the weather in Boston, MA today?",
        convo_id="convo-weather-001",
    )

    messages = [
        {"role": "system", "content": "You are helpful. Use tools when needed."},
        {"role": "user", "content": "What's the weather in Boston, MA today?"},
    ]

    # Let the model request tool invocations if needed
    first = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=[{
            "type": "function",
            "function": {
                "name": "get_current_weather",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {"type": "string"},
                        "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                    },
                    "required": ["location"],
                },
            },
        }],
        tool_choice="auto",
        temperature=0.2,
    )

    choice = first.choices[0]
    tool_calls = getattr(choice.message, "tool_calls", None)

    if tool_calls:
        messages.append({
            "role": "assistant",
            "content": getattr(choice.message, "content", None),
            "tool_calls": [{
                "id": tc.id,
                "type": "function",
                "function": {"name": tc.function.name, "arguments": tc.function.arguments},
            } for tc in tool_calls],
        })

        for tc in tool_calls:
            args = json.loads(tc.function.arguments or "{}")
            result = (
                get_current_weather(**args)
                if tc.function.name == "get_current_weather"
                else {"error": "unknown tool"}
            )
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "name": tc.function.name,
                "content": json.dumps(result),
            })

        # Final model response after tools
        second = client.chat.completions.create(
            model="gpt-4o-mini", messages=messages, temperature=0.2
        )
        final_text = second.choices[0].message.content or ""
    else:
        final_text = choice.message.content or ""

    print("Assistant:\n", final_text)
    send_to_user(final_text)
    raindrop.flush()
    raindrop.shutdown()

if __name__ == "__main__":
    raindrop.init(os.getenv("RAINDROP_WRITE_KEY"), tracing_enabled=True)
    main()
​
Using the @raindrop.interaction() decorator (Beta)
You can wrap your flow with the @raindrop.interaction("name") decorator to ensure a tracing context exists, which allows resume_interaction() to find the current Interaction without passing an event_id:
import os
import raindrop.analytics as raindrop

raindrop.init(os.getenv("RAINDROP_WRITE_KEY"), tracing_enabled=True)

def send_to_user():
    interaction = raindrop.resume_interaction()
    interaction.finish(output="It's sunny!")

@raindrop.interaction("weather_flow")
def run_weather_flow():
    interaction = raindrop.begin(user_id="user-001", event="weather_query", input="What's the weather?")
    send_to_user()
    

run_weather_flow()
resume_interaction() resolves the current Interaction by reading the active tracing context (current span). It will only find an existing Interaction when called under the same traced execution that called begin(...) (for example, inside a function decorated with @raindrop.task, @raindrop.tool, or @raindrop.interaction).
If your code runs outside that tracing context (separate thread/process, lost OpenTelemetry context, background job, etc.), pass the event ID explicitly: resume_interaction(event_id="...").
If neither a matching trace context nor an event_id is available, a new Interaction instance will be created.
​
Using the tool_span and task_span context managers (Beta)
When decorators aren’t feasible (e.g., dynamic tool selection, complex control flow), you can use context managers for fine-grained tracing control.
Requirements:
Initialize with tracing_enabled=True
Decorate your entry-point function with @raindrop.interaction to establish a tracing context
Use with raindrop.tool_span(...) or with raindrop.task_span(...) for traced blocks
Context managers support both synchronous and asynchronous code. Spans automatically inherit the current trace context and no-op when tracing is disabled.
Available methods on the span object:
record_input(data): Record input data for the span
record_output(data): Record output data for the span
set_properties(props): Set custom properties on the span
Example:
import asyncio
import os
import raindrop.analytics as raindrop
import time

raindrop.init(os.getenv("RAINDROP_WRITE_KEY"), tracing_enabled=True)

@raindrop.task("main_task")
async def main():
    interaction = raindrop.begin(
        user_id="user789",
        event="multi_tool_query",
        input="Find and summarize docs for the traceloop entity_method"
    )

    # Synchronous tool call: web_search
    with raindrop.tool_span("web_search", version=1) as tool:
        tool.record_input({"query": "traceloop entity_method documentation"})
        time.sleep(0.1)  # Simulate API call
        search_results = ["https://docs.example.com/api", "https://blog.example.com/tutorial"]
        tool.set_properties({"results_count": len(search_results)})
        tool.record_output({"urls": search_results})

    # Async tool call: document_reranker
    async with raindrop.tool_span("document_reranker") as tool:
        tool.record_input({
            "documents": search_results, 
            "query": "entity_method usage"
        })
        await asyncio.sleep(0.05)  # Simulate async reranking
        best_doc = search_results[0]
        tool.record_output({"top_document": best_doc})

    # Nested task span for summarization
    with raindrop.task_span("summarization") as task:
        task.record_input({"document": best_doc})
        summary = "The entity_method decorator allows..."
        task.record_output({"summary": summary})

    interaction.finish(output=summary)
    raindrop.shutdown()

if __name__ == "__main__":
    asyncio.run(main())
​
Using interaction.start_span() for Manual Spans (Beta)
When the span lifecycle doesn’t fit within a with block (e.g., the span starts in one function and ends in another), use interaction.start_span() to create a ManualSpan with an explicit .end() call.
span = interaction.start_span(kind="tool", name="my_tool")
Parameters:
kind (Literal[“task”, “tool”]): The type of span.
name (str): Name of the span.
version (Optional[int]): Version number for the span.
ManualSpan methods:
record_input(data): Record input data for the span.
record_output(data): Record output data for the span.
set_properties(props): Set custom properties on the span.
end(error=None): End the span. Pass an exception to mark it as failed.
ManualSpan properties:
event_id: The interaction’s event_id.
The span automatically inherits association properties (event_id, user_id, event, convo_id) from the interaction.
Example:
import os
import raindrop.analytics as raindrop

raindrop.init(os.getenv("RAINDROP_WRITE_KEY"), tracing_enabled=True)

@raindrop.interaction("my_workflow")
def main():
    interaction = raindrop.begin(user_id="user123", event="process_data", input="...")

    # Start a span
    span = interaction.start_span(kind="tool", name="external_api")
    span.record_input({"query": "example"})

    try:
        result = call_external_api()
        span.record_output(result)
        span.end()
    except Exception as e:
        span.end(error=e)

    interaction.finish(output="Done")
    raindrop.shutdown()
    
    
    
SDK
HTTP API
Here’s how you can use the Raindrop API directly, without an SDK

​
Base URL
https://api.raindrop.ai/v1
​
Authentication
All API requests must include your SDK write key in the Authorization header:
Authorization: Bearer YOUR_WRITE_KEY
You can get your API key by logging in to app.raindrop.ai (bottom of the tab bar!).
​
Endpoints
​
Track Event
Track any event, including AI interactions and normal analytics events.
POST /events/track
Request Body
(Must be provided as an array of objects)
Field	Type	Description
user_id	string	The unique identifier of the user
event	string	The name of the event you want to track
properties	object	(Optional) Additional properties associated with the event
attachments	array	(Optional) Array of attachments to include with the event
ai_data	object	(Optional) Object containing AI-specific data for AI events. If provided, either input or output (or both) is required
ai_data.model	string	(Optional) The name of the AI model used
ai_data.input	string	(Optional) The input provided by the user
ai_data.output	string	(Optional) The output generated by the AI
ai_data.convo_id	string	(Optional) The conversation ID associated with the interaction
Example Request - AI Interaction
POST /v1/events/track HTTP/1.1
Host: api.raindrop.ai
Authorization: Bearer YOUR_WRITE_KEY
Content-Type: application/json

[{
  "user_id": "user123",
  "event": "ai_interaction",
  "properties": {
    "tool_call": "reasoning_engine",
    "system_prompt": "you are a helpful...",
    "experiment": "experiment_a"
  },
  "ai_data": {
    "model": "gpt_4",
    "input": "What is the weather like today?",
    "output": "The weather is sunny and warm.",
    "convo_id": "conv789"
  },
  "attachments": [
    {
        "type": "image",
        "value": "https://example.com/image.png",
        "role": "output"
    },
    {
        "type": "code",
        "name": "Example Code",
        "value": "console.log('Hello, World!');",
        "role": "input",
        "language": "javascript"
    }
  ]
}]
Response
All authorized requests will return a 204 Success status code. For debugging failures, contact us: founders@raindrop.ai.
Event has a limit of 1 MB. Properties will be truncated for larger events. Contact us if you have custom requirements.
​
Track Signal
Track positive or negative user signals such as thumbs up, thumbs down, output schema failures, user edits, regenerations, and other ground-truth signals about your AI product’s performance. Each signal must be associated with an event_id for an event that was sent to Raindrop with the /events/track endpoint.
POST /signals/track
Request Body
(Must be provided as an array of objects)
Field	Type	Description
event_id	string	The event_id of the event that you sent to Raindrop
signal_name	string	The name of the signal (e.g., “thumbs_up”, “thumbs_down”)
timestamp	string	(Optional) ISO timestamp when the signal occurred
properties	object	(Optional) Additional properties associated with the signal
attachment_id	string	(Optional) Reference to a previously sent attachment
signal_type	string	(Optional) Type of signal: “default”, “feedback”, “edit”, or “standard”
sentiment	string	(Optional) One of “POSITIVE” or “NEGATIVE”
Example Request
POST /v1/signals/track HTTP/1.1
Host: api.raindrop.ai
Authorization: Bearer YOUR_WRITE_KEY
Content-Type: application/json

[
{
  "event_id": "123456789",
  "signal_name": "thumbs_up",
  "sentiment": "POSITIVE",
  "properties": {
    "location": "chat_ui"
  },
  "signal_type": "default"
}]
Response
All authorized requests will return a 204 Success status code. For debugging failures, contact us: founders@raindrop.ai.
​
Identify User
Associate traits with a user.
POST /users/identify
Request Body
Field	Type	Description
user_id	string	The unique identifier of the user
traits	object	The traits associated with the user
Example Request
POST /v1/users/identify HTTP/1.1
Host: api.raindrop.ai
Authorization: Bearer YOUR_WRITE_KEY
Content-Type: application/json

{
  "user_id": "user123",
  "traits": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "plan": "paid" //we recommend 'free', 'paid', 'trial'
  }
}
Response
All authorized requests will return a 204 Success status code. For debugging failures, contact us: founders@raindrop.ai.

Platform
Signals
Signals are ground truth indicators for agent performance.

​
What are Signals
Signals are ground truth indicators for agent performance. They can be positive (eg. Thumbs Up), negative (eg. Agent Forgetting), or neutral (eg. Creating Personal Website).
Signals in raindrop
​
Raindrop’s Default Signals
Raindrop has a set of default signals you can enable:
Forgetting: agent forgetting important information about the user
Task Failure: agent failing to complete its task due to an issue or error
User Frustration: user expressing frustration at the agent
NSFW: user or AI trying to discuss explicit content, violence, or self-harm
Jailbreaking: user attempting to jailbreak the AI by prompt injection or other means
Laziness: agent returning outputs that were blank, empty, or low-effort
Wins: user praising, thanking, or complimenting the assistant
​
Custom Signals
You can define any custom signal and see incident rates over millions of events. If you can describe it, Raindrop can track it.
​
Classifier Signals
You can create Classifier Signals using Deep Search.
1
Prompt Deep Search

Getting specific helps — eg. “users complaining about the website’s aesthetics” will provide better results than “ugly website”
Deep Search Query
2
Mark Examples

Review a couple examples by marking them as correct or incorrect so Deep Search can learn
Deep Search Refine
3
Update Search

Hit the “Update Search” button and Deep Search automatically generates rules based on your refinements
Deep Search Rules
4
Start Tracking

To track these signals, we’ve built a pipeline that trains small, custom models that adapt to the unique shape of each product and search. It takes about an hour to train the model and then it will review every single event you send to Raindrop. It will also backfill the previous 3 days.
Deep Search Track
5
(Optional) Additional Refinements

If you need to further refine the signal, you can hit the “x” on any event from its signal page to mark it as incorrect and give the model feedback.
​
Keyword / Regex Signals
You can define specific keywords or regex patterns to match in your events. This works great for:
Syntax / formatting patterns
Specific phrases (eg. “you’re absolutely right”)
Common behaviors (eg. the assistant apologizing)
Just describe what you’re looking for in natural language and Raindrop will generate the corresponding regex.
Regex Signal
​
Instrumented Signals
You can manually track any signal directly from your app using the SDK:
Python SDK
TypeScript SDK
HTTP API
Common manual signals include Thumbs Up / Down, Regenerations, and Shares.
Instrumented Signals
​
Tool Errors
If you send traces to Raindrop, the application will automatically pull tool errors out into signals that you can track and set up alerts for.
Tool Errors

Platform
Experiments
A/B test your agents

​
Overview
Raindrop Experiments lets teams A/B test their agents to validate and iterate on solutions and see if their fixes actually worked.
Experiments Home
​
Creating Experiments
Raindrop surfaces Experiment suggestions out of the box, but you can create experiments with any combination of:
Models
Properties
Tools
Signals
Date Ranges
You can then save experiments that you and your team can reference at any time.
Experiments Detail

Platform
Alerts
Get notifications when your agents fail

​
Daily Alerts
Raindrop sends a daily slack summary digest that summarizes the agent’s issues and wins each day.
Daily Summary
​
Configured Alerts
You can configure custom alerts for any signal (including tool errors). You can set up alerting for specific thresholds of users affected or events with a given signal, or send match alerts for every event that matches the configuration.
Alert Configuration

Platform
Search
Search for any user or agent interaction

​
Keyword & Semantic Search
Use keyword and semantic search to find specific events and explore data. You can restrict the search to just the user input or the assistant output and apply filters over time, user_id, convo_id etc.
Keyword Search
​
Deep Search
Deep Search is like deep research for your production data. You can just describe the issue you’re trying to find and Deep Search will analyze millions of interactions to find what you’re looking for.
1
Prompt Deep Search

Getting specific helps — eg. “users complaining about the website’s aesthetics” will provide better results than “ugly website”
Deep Search Query
2
Mark Examples

Review a couple examples by marking them as correct or incorrect so Deep Search can learn
Deep Search Refine
3
Update Search

Hit the “Update Search” button and Deep Search automatically generates rules based on your refinements
Deep Search Rules
4
Start Tracking

You can immediately start tracking your Deep Search as a signal. We’ve built a pipeline that trains small, custom models that adapt to the unique shape of each product and search. It takes about an hour to train the model and then it will review every single event you send to Raindrop. It will also backfill the previous 3 days.
Deep Search Track
5
(Optional) Additional Refinements

If you need to further refine the signal, you can hit the “x” on any event from its signal page to mark it as incorrect and give the model feedback.
​
Filtering
Every table in the app has powerful filtering that lets you filter by event, user, conversation, date range, any property, model, tool, and signal.
Filter