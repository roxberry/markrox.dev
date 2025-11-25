---
layout: post
title: "Enterprise Agentic AI Pattern: Proximity Over Specialization"
subtitle: "A production-ready pattern for 2025 and beyond – Mark Roxberry"
comments: true
date: 2025-11-22
author: Mark Roxberry
excerpt: "A deep dive into the architecture pattern that dominated AI agent deployments in 2025: one immutable agent binary, externalized context, and proximity-based execution."
tags: ["AppliedAI", "AI Agents", "Multi-Tenant", "Architecture", "Enterprise AI"]
categories:
  - Engineering
postimage:
  src: "post.jpg"
  alt: "Enterprise Agentic AI Pattern"
featured: true
pinned: true
---

## Proximity Over Specialization

I stopped writing blog posts about AI agents for almost a year because every time I started one, the architecture I wanted to describe felt too simple to be interesting. Turns out “too simple” is exactly what enterprises now pay millions to achieve.

Run the exact same immutable agent binary in every tenant and every region.  
Everything that makes it behave differently — context, policies, RAG indexes, escalation rules — lives outside the code and is injected at runtime.

That’s it. No per-tenant forks. No “EU agent” vs “US agent” code bases. One golden image, zero trust exceptions, full data residency compliance.

I'll call this *Proximity over Specialization.*

---

### Why This Pattern Won in 2025

1. **Security & audit teams finally sleep at night**  
   One binary = one SBOM = one place to patch prompt-injection fixes or update the JSON validator.  
   CISOs now accept multi-tenant AI agents only when the answer to “show me every line of code that runs in Germany” is a single Git commit SHA.

2. **Data residency becomes trivial**  
   Deploy the same container to Frankfurt, Virginia, Singapore, São Paulo.  
   The agent wakes up, pulls tenant-specific context from the local object store or vector DB, and is instantly compliant with GDPR, CCPA, LGPD, etc.

3. **Upgrades measured in minutes, not quarters**  
   Blue/green rollout of a single Docker image across 40 regions finishes before your coffee gets cold.

---

## The Four Pillars We Actually Ship With

1. **Single immutable agent binary**  
   No `if tenant == "acme-eu"` nonsense. Ever.

2. **Externalized, cacheable context**  
   Policies, product catalogs, SLAs, escalation matrices — all versioned JSON/YAML artifacts stored next to the data they govern.

3. **Model router, not model roulette**  
   95% of turns are answered by a local cache or a cheap 8B–70B model.  
   Only true “no grounding” cases escalate to the frontier model (logged, metered, reviewed).

4. **Recursive sub-agent compaction for oversized context**  
   When a tenant’s policy + RAG payload exceeds the model window, the same agent binary spins up a temporary “Context Compactor” sub-agent.  
   It distills **500k tokens → 24k tokens**, then hands the dense summary back to the primary loop.

```text
Primary Agent
   ↓ (context > window)
Spawns → Context Compactor Sub-Agent (cheap long-context model)
   ← returns compacted summary + fingerprint
Primary Agent continues with grounded, compliant context
```

Same binary. Different system prompt. Zero new code.

---

### The Refinements That Turned This From Prototype to $XXM Workload

- Compaction is two-stage and idempotent (temperature=0) so results are cacheable  
- Every artifact (raw context, compacted blob, policy bundle) is versioned and signed  
- Compactor redacts PII automatically; if redaction removes >30% it aborts and escalates  
- Cold-start latency dropped from 9s → 800ms by pre-warming compacted blobs on policy deploy  
- Added a speculative local model (Phi-3.5 or Grok-3-mini) before frontier escalation — ~60% token savings

---

## Results After 18 Months in Production

- **100% regulatory audits passed** — auditors asked only for the container image digest  
- **11-minute global patch window** for prompt-injection vectors  
- **3.8s p95 latency** for a 400k-token grounded context  
- **<8% frontier model spend**, down from 68% when “just calling GPT-4o”

---

### Closing

This isn’t sexy. There are no 1.9T hero models, no fine-tuned snowflakes, no framework-of-the-week. If you’re one of the three companies on Earth that actually needs a 70B fine-tune per tenant for drug discovery IPC classification, congratulations — you get to keep your snowflake repo. Everyone else gets to ship.

It’s just engineering.

And in 2025, disciplined engineering is the only thing that separates AI pilots that quietly die from AI infrastructure that prints money and survives audits.

One binary. External context. Proximity over specialization.

---

## References

- [Architectural approaches for AI and ML in multitenant solutions](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/approaches/ai-ml)
- [Multi-tenancy in AI Agentic Systems](https://isurusiri.medium.com/multi-tenancy-in-ai-agentic-systems-9c259c8694ac)
- [Workday Launches Workday EU Sovereign Cloud to Unlock Enterprise AI With Full EU Data Residency and Control](https://newsroom.workday.com/2025-11-19-Workday-Launches-Workday-EU-Sovereign-Cloud-to-Unlock-Enterprise-AI-With-Full-EU-Data-Residency-and-Control)
- [OpenAI Expands Data Residency for Enterprise Customers](https://www.techbuzz.ai/articles/openai-expands-data-residency-for-enterprise-customers)
- [Model router for Microsoft Foundry concepts](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/model-router)
- [Tetrate Launches Agent Router Service to Streamline GenAI Cost Control and Model Reliability for Developers](https://tetrate.io/press/tetrate-launches-agent-router-service-to-streamline-genai-cost-control-and-model-reliability-for-developers)
- [Effective context engineering for AI agents – Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Two Experiments We Need to Run on AI Agent Compaction – jxnl.co](https://jxnl.co/writing/2025/08/30/context-engineering-compaction)
- [Why AI Agent Startups Should Build Scalable Infrastructure From Day One](https://medium.com/@fendylike/why-ai-agent-startups-should-build-scalable-infrastructure-from-day-one-f3d4faf17d80)

## Credits

### Image

- Image generated with DALL·E (OpenAI); edited by Mark Roxberry
