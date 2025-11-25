---
layout: post
title: "Deterministic Generation: Skills Make LLMs Actually Reliable"
subtitle: "The assumption of an absolute determinism is the essential foundation of every scientific enquiry. - Max Planck"
comments: true
date: 2025-11-14
author: Mark Roxberry
excerpt: After two decades debugging production systems across defense, healthcare, financial services, and gaming, I've learned that "it works most of the time" isn't good enough. Here's how to make LLM-driven skills behave.
tags: [AppliedAI, AI, reliability, tooling, prompt-engineering]
categories:
  - AI Strategy
postimage:
  src: "post.png"
  alt: "Abstract growth spectrum visual representing predictable AI workflows"
featured: true
pinned: true
---

## The Problem I Keep Seeing

Having architected high-availability systems for defense, healthcare, finance, and large-scale gaming, I’ve learned that 24/7 operations leave no room for ‘the AI might have chosen correctly.’ At 3 a.m., you need deterministic, predictable execution.

LLMs are powerful, but they're fundamentally probabilistic (i.e., LLMs sample outputs rather than guaranteeing the same answer). That's fine for creative work; it's a feature. But when you need the model to call external tools, pass structured arguments, or integrate into production workflows? That non-determinism becomes your enemy.

I've seen these failure modes:

- Missing tool invocations when you *know* the context demanded it
- Malformed arguments that blow up downstream systems
- Hallucinated values—invented IDs, categories that don't exist
- Bugs you can't reproduce because the model just... decided differently this time

After enough late-night incidents, you start building defenses.

## What Deterministic Generation Actually Means

Deterministic Generation isn't a framework or library. It's a discipline: using explicit schemas, constrained prompts, few-shot examples, and strict validation so your model outputs, especially tool calls, are repeatable and verifiable.

To be clear: the LLM's text generation remains probabilistic, but by routing through validated tool calls with explicit schemas, the *system's execution* becomes deterministic. Same tool invocation, same parameters, same result. We're moving intelligence from probabilistic reasoning to deterministic execution.

In practice this means treating each LLM-invoked tool call as a subroutine in an operational system, rather than as free-form text generation. The prompt provides a rigid contract; it is never ambiguous. The schema defines the shape of the call, the validation layer ensures the contract is met, and the execution layer either proceeds or gracefully fails back. By decomposing intelligence into predictable, verifiable skills rather than monolithic reasoning sessions, you shift from ‘creative AI assistant’ to ‘operational execution engine’.”

The key insight: the LLM executes skills that are deterministic and lightweight, not context-heavy operations. You're not asking the model to reason deeply about every tool call, instead you're asking it to match patterns and apply structured templates. Heavy context and reasoning happen in the prompt design and validation layers, not in the skill execution itself.

The implementation varies by provider (Claude Skills, OpenAI function calling, whatever), but the principles stay consistent:

1. **Precise tool definitions** - Machine-readable schemas, not documentation
2. **Structured prompts** - Explicit rules and examples, not vague guidelines  
3. **Runtime validation** - Schema checks plus semantic verification
4. **Controlled execution** - Clear fallbacks when things go wrong

Think of it as defensive programming for AI systems.

## How I Actually Implement This

I'm going to walk through a product search example here, even though I've been talking about operations systems. Why? Because the patterns are identical, but showing you a hospitality incident management schema with 40 fields and complex validation rules would obscure the principles. Product search is simple enough to understand immediately, but it demonstrates every technique you'll use for ITSM tickets, security alerts, or any other operational tool calling. Once you see how to make product_search deterministic, you can apply the same discipline to incident_create, user_provision, or alert_escalate.

### Start with the Schema

Every skill gets a JSON schema. I make fields required wherever possible and enumerate valid values. No room for creative interpretation.

```json
{
  "name": "product_search",
  "description": "Search for products by query and optional category.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "minLength": 1 },
      "category": {
        "type": "string",
        "enum": ["electronics","books","clothing","home_goods"],
        "default": "all"
      }
    },
    "required": ["query"]
  }
}
```

**Note on required fields**: In this example, only `query` is required. For more complex tools, like incident creation or user provisioning, you'll have multiple required fields (severity, system, title, etc.). When the LLM attempts a tool call with missing required fields, your validation catches it and can trigger a follow-up question to the user. However, it's better to handle this proactively in your prompt engineering: explicitly tell the model to collect all required information before attempting the tool call. Use validation as a safety net, not as your primary mechanism for handling missing data.

For example, if you have an `incident_create` tool with multiple required fields:

```prompt
System: When creating incidents, you MUST collect: title, severity (P1/P2/P3/P4), 
and affected system. If the user hasn't provided severity, ask before calling 
incident_create.

User: "Our payment system is down."
Assistant: "I'll create an incident for the payment system outage. What severity 
level should I assign? (P1 for critical/immediate, P2 for high, P3 for medium, 
P4 for low)"
```

This prevents validation failures and creates a better user experience.

### Prompt Engineering That Actually Works

System prompts need to be explicit. I mean *really* explicit. Tell the model what to do, when to do it, and what not to do:

```prompt
System: You are an assistant that MUST use the product_search tool 
when the user asks to find products. Use only these categories: 
electronics, books, clothing, home_goods. Do not invent categories.

Example:
User: "Find me a laptop."
Expected tool call: 
{"tool":"product_search","args":{"query":"laptop","category":"electronics"}}
```

Few-shot examples help. Negative constraints help more. The model needs to know its boundaries.

### Validation Before Execution

This is where you catch problems before they become incidents. Use a JSON schema validator at runtime—I like ajv for Node.js:

```js
import Ajv from "ajv";
const ajv = new Ajv();
const validate = ajv.compile(productSearchSchema.input_schema);

const llmOutput = /* parsed tool args */;
if (!validate(llmOutput)) {
  // Don't execute. Log, retry with stricter prompt, or ask user for clarity
  console.error("Validation failed:", validate.errors);
  return handleInvalidOutput(llmOutput, validate.errors);
}
```

Schema validation catches structure problems. Then add semantic checks: Is the query non-empty? Is the category actually in the enum? Are string lengths sane?

### Controlled Execution and Fallbacks

When validation passes, execute the tool. When it fails:

- Ask the user a clarifying question, or
- Retry with a more constrained prompt, or  
- Return a safe default

Log every decision. In production systems, observability isn't optional.

## Real Example: Building Affiliate Links

I work with Amazon affiliate links regularly. Given a product record, the URL needs to be built consistently:

```js
function buildAmazonUrl({ slug, asin, linkId, tag = "markroxdev-20" }) {
  if (!slug || !asin || !linkId) return defaultAmazonPageUrl;
  return `https://www.amazon.com/${slug}/dp/${asin}?th=1&linkCode=ll1&tag=${tag}&linkId=${linkId}&language=en_US&ref_=as_li_ss_tl`;
}
```

Validate inputs before building. If any required field is missing, don't guess! Use the default or ask for correction.

## Why This Matters

The impact has been consistent across implementations:

- Reliability in production increased measurably
- Automated tests became possible (you can assert on tool call structure)
- Integration safety improved (fewer unintended external calls)
- Debugging got easier (deterministic behavior means reproducible bugs)

## The Trade-offs

Over-constraining can hurt. If you lock down every parameter, you lose flexibility for ambiguous user intents. I've found the sweet spot is: constrain what matters for safety and correctness, but leave room for the model to handle natural language variation.

One subtle cost: by constraining the model you may suppress emergent use-cases or unexpected insights. Therefore it’s prudent to separate modules of your system: use an unconstrained LLM for discovery or ideation, and a locked-down skill engine for execution. Over time the ideation outputs can feed into new deterministic skills if the use-case matures.

Also, schemas need maintenance. As features evolve, your tool definitions evolve. And model upgrades can change behavior; regression tests are your friend.

## Where to Start

Pick one high-impact tool call in your system. Write its schema. Craft a strict prompt with examples. Implement validation logic. Add a test that asserts the shape of the model's output.

Then iterate. You'll find the patterns that work for your domain.

## References

### Model provider docs

- [OpenAI: Function calling guide](https://platform.openai.com/docs/guides/gpt/function-calling)
- [Anthropic: Agent Skills](https://www.claude.com/blog/skills)
- [Anthropic Skills on Github](https://github.com/anthropics/skills)
- [Google Cloud: Mitigating hallucinations](https://cloud.google.com/vertex-ai/docs/generative-ai/mitigate-hallucinations)

### Observability

- [LangChain: tools & output parsing](https://python.langchain.com/en/latest/modules/agents/tools.html)
- [Practical guide to deterministic outputs](https://platform.openai.com/docs/guides/gpt/parameters)

## Credits

### Quote

- [QuoteFancy](https://quotefancy.com/quote/1368901/Max-Planck-The-assumption-of-an-absolute-determinism-is-the-essential-foundation-of-every)

### Image

- Image generated with DALL·E (OpenAI); edited by Mark Roxberry
