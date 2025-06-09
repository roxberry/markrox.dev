---
layout: post
title: "Azure Generative Search POC: Fully formatted facts, Agentic, MCP, MEF"
subtitle: "Showcasing GenSearch breakthroughs, secure AI, and hands-on innovation"
comments: true
date: 2025-06-08 12:00:00
author: Mark Roxberry
excerpt: Over the past few months, I’ve led the design and development of a Proof of Concept (PoC) engagement co-sponsored by Microsoft and a trusted enterprise client.
tags: [generative intelligence, Azure, data, search]
categories:
  - innovation
postimage:
  src: "post.png"
  alt: "Generative Search POC"
featured: true
---

Over the past few months, I’ve led the design and development of a Proof of Concept (PoC) engagement co-sponsored by **Microsoft** and a trusted enterprise client. Our mission: deliver a secure, intelligent search assistant that transforms complex document repositories into conversational, explainable insights using Azure’s evolving AI ecosystem.

## The Mission

The PoC focused on enabling **Retrieval-Augmented Generation (RAG)** over enterprise documents using natural language. But we didn’t stop at answering questions. We aimed to demonstrate the future of enterprise LLM systems—systems that are secure, modular, cost-aware, and above all, *useful*.

Key goals included:

- Building a **RAG-enabled Generation Search Assistant**
- Integrating with **Azure AI Search** (hybrid: vector + keyword)
- Ingesting structured and unstructured data from **Azure Blob Storage**
- Supporting **prompt engineering**, **agentic interactions**, and **secure context traceability**
- Creating a **prompt engineering workbench** for iterative design and test
- Laying the foundation for **agent-oriented architectures** powered by intelligent model routing

## Architecture: From Assistant to Agent

I designed the architecture to be modular and future-forward. It reflects a shift from monolithic AI calls to **agent-enabled systems** capable of reasoning, switching models, and enforcing control boundaries.

### Core Components I Architected

- Azure Blob Storage  
- Azure AI Search (hybrid vector and keyword)  
- Azure OpenAI + Azure AI Foundry  
- Model Router  
- Model Context Protocol (MCP)  
- App Services layer  
- Chainlit-based UI  
- Factlit (experimental front end for testing)

### Agentic and MCP-Enabled Generation

By integrating **Model Router** and the **Model Context Protocol (MCP)**, I enabled the assistant to act more like an intelligent agent—capable of orchestrating secure, data-aware, multi-step reasoning.

> MCP is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools. In our architecture:
>
> - The assistant acts as an MCP client, connecting to enterprise data systems via MCP servers.
> - This allows structured, policy-controlled access to trusted sources during runtime.
> - It supports workflows like personalized document filtering, contextual grounding, and real-time data integration.

## Metadata Enrichment and Secure Indexing

I developed a custom **Azure AI Indexer and Skillset** with a document ingestion function that queries the client’s metadata database. This enrichment pipeline:

- Adds versioning, project, and permission metadata to document chunks  
- Ensures security filters are enforced during search and retrieval  
- Supports traceability and access-bound generation logic

## The Role of Factlit: My AI Architect Toolkit

As part of my development workflow, I created **Factlit**—a frontend interface to test prompt engineering, model behaviors, and output types across platforms.

Using Factlit, I:

- Tuned system prompts and templates  
- Ran comparisons across Azure OpenAI, OpenAI, and Anthropic  
- Demonstrated access to both **ChromaDB** and **Azure AI Search** as knowledge sources  
- Validated "Fully Formatted Fact" ingestion strategy, reducing hallucinations to **under 1%** in test queries  

## Prototype Design: Angular Microfrontend Architecture

The production-ready prototype is not a standalone app—it’s an **Angular library** designed to be integrated as a **microfrontend**.

- Built as a library to be embedded in existing enterprise applications  
- A **host wrapper** was developed for the PoC to simulate the runtime environment  
- OIDC tokens (including `oid` and `sub`) were used to identify the user and filter responses server-side  
- Secure search filtering and project-aware context were demonstrated  

## How We Built the Prototype

1. **Document Ingestion** – Chunking, enrichment, and hybrid indexing  
2. **RAG Execution Loop** – Semantic + keyword retrieval → contextual generation  
3. **Prompt Workbench** – Factlit-supported iterative design  
4. **Observability** – Usage logging, traceability, and response inspection  

## Results

- Grounded, citation-aware responses using enterprise documents  
- Secure and dynamic prompt routing via Model Router  
- MCP-enabled context integration for enterprise data  
- Angular-based microfrontend for easy app embedding  
- Hallucination rate reduced to <1% using fully formatted fact ingestion  
- Semantic caching integration in progress  

## Looking Ahead

### 1. Data Enrichment

- SpaCy, LangChain for local  
- Azure AI Studio, Cognitive Services for cloud  
- Unified pipelines for multimodal enrichment

### 2. Semantic Caching

- Vector similarity with sliding expiration  
- Version-aware invalidation  
- Query path reuse and shortcutting

### 3. Prompt Engineering Workbench

- Prompt versioning, rollback, and scoring  
- Controlled A/B testing  
- Output grading pipelines

### 4. FinOps for AI

- Token accounting and usage caps  
- Model fallback logic (e.g., GPT-4 → GPT-3.5)  
- Spend observability per team/project

### 5. Proliferation: Cloud to SoC

- On-device quantized models  
- Offline AI copilots  
- Edge RAG agents with local context

## Final Reflection

This project was about more than building a smart search box. It was a glimpse into what enterprise AI can become when it’s modular, secure, intelligent, and adaptable.

Microsoft’s support enabled us to push boundaries—and now, with the foundation laid, we’re ready to take the next leap.

## References & Further Reading

For those interested in the technologies and architectural components mentioned in this post, here are helpful links and resources:

### Microsoft Azure AI Services

- [Azure AI Search (Vector + Hybrid Search)](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/overview)
- [Azure AI Studio](https://azure.microsoft.com/en-us/products/ai-services/ai-studio/)
- [Azure AI Foundry](https://techcommunity.microsoft.com/t5/ai-machine-learning-blog/introducing-azure-ai-foundry/ba-p/4098816)
- [Azure API Management](https://azure.microsoft.com/en-us/products/api-management/)

### Architecture Concepts

- [Retrieval-Augmented Generation (RAG) Overview – OpenAI](https://openai.com/blog/chatgpt-retrieval-plugin)
- [Prompt Engineering Guide (Brevity, Format, Structure)](https://www.promptingguide.ai/)
- [Fully Formatted Facts](https://gettectonic.com/fully-formatted-facts/)

### Agentic Systems

- [OpenAI Function Calling and Agents](https://platform.openai.com/docs/guides/function-calling)
- [LangChain Agents](https://docs.langchain.com/docs/components/agents/)
- [Autonomous Agents Overview (AutoGPT, LangGraph)](https://blog.langchain.dev/langgraph-v0-0-1/)

### Model Context Protocol (MCP)

- [Introducing the Model Context Protocol – Anthropic](https://www.anthropic.com/news/model-context-protocol)
- [MCP Spec Overview](https://github.com/anthropic/model-context-protocol)