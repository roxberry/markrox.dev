—
layout: post
title: “Bsides Philly 2025”
subtitle: “Observations and takeaways from a community-driven security conference”
comments: true
date: 2025-10-05
author: Mark Roxberry
excerpt: “A recap of my experience at Bsides Philly 2025 — highlights, insights, and what comes next.”
tags: [“conference”, “cybersecurity”, “bsides”, “ai-security”, “hacking”]
categories:
  - conferences
  - security
  - hacking
postimage:
  src: “post.jpg”
  alt: “Bsides Philly 2025”
featured: true
pinned: true
—

# Bsides Philly 2025

## What is Bsides?

[Bsides Philly](https://bsidesphilly.org) is a community-driven cybersecurity conference bringing together security professionals, researchers, and enthusiasts to share knowledge, network, and advance the field of information security.  
This year’s event delivered a mix of culture, creativity, technical depth, and a refreshing honesty about the realities of modern security work.

—

## Highlights From the Day

### 09:00 — Keynote by Jayson Street  
**[The Imposter’s Guide to Hacking… Without Technical Talent!](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64837)**

Jayson leaned into what makes hacking *human*. His core message echoed throughout the talk:  
“Rick Astley has done more for cyber security than any other human in history.”

His “attack techniques” were reminders of the power of human behavior:

- Kindness  
- Curiosity  
- Routine  

He emphasized that giving the “client a win” creates collaboration rather than confrontation — a foundational mindset for effective security work.

—

### 10:00 — Purple Teaming  
**[Session Link](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64846)**  
**Speaker: [Sara Hune](https://sra.io/author/sarah-hume/)**

This session presented purple teaming as **shared-space coordination** rather than BAS or traditional Red/Blue separations.

Key takeaways:

- Purple teaming focuses on *visibility, validation, and assurance*.  
- Red performs attacks → Blue observes tooling, telemetry, and detection paths.  
- Blue mitigates → Red learns constraints and defensive gaps.  
- The **Assumed Compromise Approach** reframes risk: instead of “how they get in,” focus on “what happens next.”

Sara compared “classic findings” to “assumed compromise findings” in contexts like DNS exfiltration, ransomware stages, and scheduled task hijacking.  
Her inversion of the Lockheed Kill Chain — focusing on breaking stages rather than tracing them — stood out.

—

### 11:00 — Your AI Agent Just Got Pwned  
**[Session Link](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64855)**

This session framed the vulnerabilities of autonomous systems through the lens of **scaffolds** and **harnesses**:

- The agent harness (the control layer around the model) can be compromised.  
- Guardrails and wrappers are insufficient if the harness itself isn’t trustworthy.  
- Securing AI means securing the model *and* everything surrounding it.

References worth exploring:

- *Lethal Trifecta* — https://simonwillison.net/2025/Aug/9/bay-area-ai/  
- *Effective Harnesses for Long-Running Agents* — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

—

### 11:35 — From Pods to PCI  
**[Session Link](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64970)**

A Kubernetes security session mapped to audit and compliance expectations.  
Content-heavy and documentation-focused, but valuable for organizations running PCI workloads on containerized infrastructure.

—

### 13:00 — LLM-SRO: Ontology-Driven Security for Large Language Models  
**[Session Link](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64853)**

A presentation introducing the **Security Risk Ontology (SRO)**, positioned alongside frameworks like:

- OWASP Top 10 for LLMs  
- MITRE Atlas

Open question: Is SRO intended for LLM training, risk classification, RAG design, or evaluation harnessing? The examples suggested it spans all three.

Reference:  
https://www.baldwinschool.org/news-story?pk=1395687&fromId=249697

—

### 14:00 — Don’t Worry, Everyone Is That Bad!  
**[Session Link](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64849)**

A humorous but sobering set of corporate mishaps — decommissioned servers still holding financial data, email archives left intact, and “retired” systems sold with sensitive content still on them.

A reminder: security failures are common, not exceptional.

—

### 15:00 — Catching the Catchers  
**[Session Link](https://hackertracker.app/event?conf=BSIDESPHILLY2025&event=64848)**

A deep dive into the evolution of cell-site simulators and open-source detection efforts.

Key reference:  
EFF’s Rayhunter — https://www.eff.org/deeplinks/2025/03/meet-rayhunter-new-open-source-tool-eff-detect-cellular-spying

A helpful chart illustrated various adversary “interventions,” including downgrade attacks, interception points, and detection heuristics.

—

## What’s Next for Me?

1. **Investigate the “harness” model for AI agents.**  
   Determine whether this is an emerging architectural pattern or a formalized approach to long-running autonomous systems. Prototype a small example.

2. **Define what Purple Teaming means in my consulting practice.**  
   Translate Sara’s shared-space model into deliverables, workflows, and engagement formats.

3. **Explore the SRO framework.**  
   Clarify whether its primary use is training, risk modeling, RAG structuring, or system evaluation.

—