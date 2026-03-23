---
layout: post
title: "Designing the HACTU8 IAC Workbench"
subtitle: "A guided extension authoring surface for OWASP HACTU8"
comments: true
date: 2026-03-23
author: Mark Roxberry
excerpt: Designing a React-based IAC Workbench that lets architects define extension templates and builders generate schema-valid HACTU8 test, tool, and attack packages.
tags: [AppliedAI, AI, OWASP, HACTU8, GenAI]
categories:
  - AppliedAI
postimage:
  src: "post.png"
  alt: "HACTU8 IAC Workbench architecture"
featured: true
pinned: true
---

## Introduction

After building the IAC prototype extension system, the next obvious gap was extension authoring.

The runtime can install, isolate, and execute extensions, but that only solves half the problem. To make HACTU8 practical at scale, we also need a structured way to create those extensions consistently. Test authors, red teams, and blue teams should be able to generate valid packages without hand-assembling YAML, scaffolds, and entrypoints every time.

The proposed answer is the **IAC Workbench**: a React-based microfrontend surface for designing, generating, validating, previewing, and publishing HACTU8 extensions.

The goal is straightforward:

- let **Architects** define reusable extension templates
- let **Builders** generate complete extensions from those templates using guided prompts
- keep the output schema-valid and ready for packaging or publication

## Workbench Roles

The Workbench supports two roles with different responsibilities.

### 1. Architect

Architects define the template layer used during generation. A template captures the category, metadata expectations, system prompt, scaffold files, and output contract for a class of extensions.

That means the Architect is not writing one extension. The Architect is defining a repeatable extension pattern.

### 2. Builder

Builders select a template, describe the extension in natural language, confirm metadata, and generate the final package.

This keeps the Builder workflow focused on intent instead of structure. The LLM can help assemble the package, but the template keeps the shape controlled.

## Extension Categories

The Workbench is designed around three HACTU8 extension categories:

- `test`: automated assurance suites targeting an OWASP risk
- `tool`: blue-team operational utilities
- `attack`: red-team offensive tooling

Those categories matter because they influence prompt design, output expectations, and validation rules. A test suite should not be scaffolded the same way as an attack tool, and neither should look like an operational blue-team utility.

## Workbench Architecture

The proposed page structure is intentionally small and focused:

- `TemplateSelector`
- `PromptComposer`
- `MetadataForm`
- `GenerationPanel`
- `ExtensionPreview`
- `ValidationBadge`
- `PublishAction`

This creates a guided flow instead of a generic chat interface.

1. Select a template
2. Enter a build prompt
3. Resolve metadata
4. Generate through the backend
5. Preview YAML and files
6. Validate output
7. Publish or export

At the page level, that looks like this:

```mermaid
%%{init: {'theme':'dark'}}%%
flowchart LR
    A[TemplateSelector] --> B[PromptComposer]
    B --> C[MetadataForm]
    C --> D[GenerationPanel]
    D --> E[ExtensionPreview]
    E --> F[ValidationBadge]
    F --> G[PublishAction]
```

## Interactive Mockup Demo

I also built an HTML concept demo of the Workbench that can be embedded directly in this post.

<iframe
  src="/demos/hactu8-workbench-mockup.html"
  title="HACTU8 IAC Workbench Mockup"
  width="100%"
  height="760"
  style="border:1px solid #253a55;border-radius:8px;background:#0d1520;"
  loading="lazy"
  allow="fullscreen"
  allowfullscreen
></iframe>

Open directly: [HACTU8 Workbench Mockup](/demos/hactu8-workbench-mockup.html)

## Architect Templates

The Architect side is where most of the governance lives.

Each template defines:

- extension category
- required and optional metadata fields
- fields that may be inferred from the prompt
- the system prompt used during generation
- scaffold files such as `main.py` and `README.md`
- the output contract and validation target

This is the right design choice. Without templates, the LLM is effectively inventing structure. With templates, the LLM is filling in a controlled contract.

Example template shape:

```yaml
template_id: python-test-template-v1
name: Python Test Template
category: test
description: Generate a Python-based HACTU8 test extension.
author: Mark Roxberry
version: 1.0.0
metadata_fields:
  required:
    - name
    - version
    - author
    - description
  optional:
    - owasp_ref
    - tags
  infer_from_prompt:
    - name
    - owasp_ref
system_prompt: |
  You are a security extension generator for OWASP HACTU8.
  Generate a schema-valid test extension package.
scaffold:
  - path: main.py
    content: |
      # HACTU8 Extension Stub
      # TODO: implement
  - path: README.md
    content: ""
output_contract:
  required_files:
    - extension.yaml
    - main.py
    - README.md
  validates_against: hactu8-extension-schema-v1
```

## Builder Flow

Builder mode is where the Workbench becomes productive.

The user starts from a template, not a blank file. They can describe the intended extension in plain language, and the system resolves likely metadata before generation.

Example prompts:

- `Create a test suite extension to find vulnerabilities for LLM04:2025 Data and Model Poisoning`
- `Create a tool extension to crawl the network and catalog AI requests, name it IntelMap`
- `Create an attack extension to flood an LLM service with malformed payloads, name it FloodAI`

The metadata form then confirms or overrides the inferred values. That step matters. It prevents the model from silently owning the final package identity.

## Extension Contract

Every generated extension package must conform to the same YAML schema. That gives the platform one reliable contract across authoring, validation, packaging, and runtime.

Example extension package:

```yaml
apiVersion: hactu8.owasp.org/v1
kind: Extension
metadata:
  name: flood-ai
  version: 1.0.0
  category: attack
  author: Mark Roxberry
  description: Flood an LLM service with malformed payloads for resilience testing.
  tags:
    - OWASP
    - HACTU8
    - LLM
  owasp_ref: LLM04:2025
spec:
  entrypoint: main.py
  language: python
  inputs:
    - name: target_url
      type: string
      required: true
      description: Target endpoint for testing
  outputs:
    - name: findings
      type: json
      description: Structured run results and findings
  steps:
    - Validate inputs
    - Generate malformed payloads
    - Execute requests
    - Capture results
  dependencies:
    - requests
    - pyyaml
  template_id: python-attack-template-v1
```

The main validation rules are also clear:

- schema validity
- kebab-case naming
- semver versioning
- category membership
- entrypoint existence
- valid OWASP reference format

## LLM Integration

The Workbench resolves model configuration from the backend API only.

That is an important constraint. No provider secrets are stored in the browser, and the client only receives enough information to label the UI.

```json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "endpoint": "/api/llm/proxy"
}
```

All generation traffic flows through the backend proxy. The API key remains server-side in environment variables or backend-managed configuration.

If the model provider is not configured, the Workbench should not partially fail. It should render a clear **MODEL PROVIDER NOT CONFIGURED** state and stop there.

## Prompt Construction

The generation call is more structured than a normal chat prompt. It combines the Architect template, the extension schema, and the user-confirmed metadata into a single controlled request.

```plaintext
SYSTEM:
  {template.system_prompt}
  Extension schema: {embedded YAML schema}
  Output format: Return ONLY valid JSON

USER:
  {user_prompt}
  Metadata:
    name: {name}
    version: {version}
    category: {category}
    author: {author}
    description: {description}
    owasp_ref: {owasp_ref}
    tags: {tags}
```

This is one of the strongest parts of the proposal. It reduces ambiguity, constrains the output shape, and gives validation a clear target.

## Validation and Preview

Generated output is only useful if the user can inspect it and trust it.

The preview surface needs to show:

- rendered YAML
- generated file tree
- validation status
- inline validation errors when the contract fails

The validation stage should check both structure and packaging rules. It is not enough for the YAML to parse. The entrypoint has to exist, required files have to be present, and the metadata has to match expected formats.

## Publish and Export

Once generation passes validation, the output should be publishable directly into the extension registry or exportable as a zip package.

That gives the Workbench a full lifecycle role instead of making it a temporary draft surface.

Relevant API contracts are simple and practical:

- `GET /api/workbench/templates`
- `POST /api/workbench/templates`
- `POST /api/workbench/generate`
- `POST /api/workbench/validate`
- `POST /api/extensions`
- `GET /api/config/llm`

That is enough to support template management, generation, validation, publication, and model configuration discovery.

## Phase 2: Agentic Generation Loop

The more interesting part of the proposal comes in Phase 2.

Instead of a single generate call, the Workbench moves to a bounded correction loop:

```plaintext
Generating -> Validating -> Correcting (1/3) -> Correcting (2/3) -> Complete
```

That loop makes sense for this problem space. Most generation failures are not conceptual failures. They are contract failures: a missing file, malformed YAML, invalid metadata, or an entrypoint that does not match the file list.

Feeding those errors back into the model for up to three correction passes is a practical way to increase successful output without hiding failure from the user.

## MCP Integration

The proposal becomes stronger once MCP is introduced.

Three MCP servers are especially useful here:

### 1. HACTU8 Registry MCP

This lets the model inspect existing extensions, check name availability, and avoid duplicate work.

### 2. OWASP Risk Reference MCP

This gives the model live OWASP LLM risk details instead of relying on training data alone. That is especially useful when generating test extensions tied to a specific risk like `LLM04:2025`.

### 3. Scan Results / Logs MCP

This gives the IAC copilot access to historical run results and findings, making the broader platform more useful for analysis and iteration.

With MCP in place, the Workbench is no longer just generating code. It is generating against live registry state, live OWASP guidance, and eventually live execution history.

## File Layout

The proposed source layout is clean and maps directly to the feature surface:

```plaintext
src/
  workbench/
    WorkbenchPage.tsx
    components/
      TemplateSelector.tsx
      PromptComposer.tsx
      MetadataForm.tsx
      GenerationPanel.tsx
      ExtensionPreview.tsx
      ValidationBadge.tsx
      PublishAction.tsx
    architect/
      ArchitectTemplatePage.tsx
      TemplateForm.tsx
    hooks/
      useTemplates.ts
      useGenerate.ts
      useValidate.ts
      useLlmConfig.ts
    types/
      extension.ts
    utils/
      schemaValidator.ts
      promptBuilder.ts
      yamlParser.ts
    api/
      workbenchApi.ts
```

This keeps the UI concerns, API concerns, and validation concerns separated without making the feature harder to understand.

## Why This Workbench Matters

The IAC extension runtime made HACTU8 pluggable.

The Workbench makes it authorable.

That is a meaningful step forward because it changes extension creation from a manual packaging task into a guided engineering workflow with templates, validation, streaming generation, and publish-ready output.

For a security platform, that is the right shape. It keeps the model inside a controlled pipeline rather than asking it to invent both the implementation and the contract at the same time.

## References

- [OWASP HACTU8](https://owasp.org/www-project-hactu8/)
- [OWASP LLM Top 10](https://genai.owasp.org/)
- [LLM04:2025 Data and Model Poisoning](https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/)
- [OWASP HACTU8 reference solution repository](https://github.com/OWASP/www-project-hactu8/tree/reference-solution)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## Credits

### Image

- Local project asset: post.png
