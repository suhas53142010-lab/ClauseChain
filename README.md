# ClauseChain

**A plain-language legal document companion for India.** ClauseChain helps people and small businesses move from legal complexity to informed review. Users can upload a contract and receive a readable explanation of its key provisions, obligations, deadlines, unclear language, and questions to raise with an advocate. They can also describe a proposed deal in everyday language and create an editable agreement draft with a transparent review checklist.

## Hackathon concept

Legal documents often contain consequential commitments expressed in language that is difficult for non-specialists to interpret. ClauseChain is an India-focused legal-tech platform intended to narrow that comprehension gap and make the early stages of contract work more accessible. It brings document explanation, preliminary drafting, and structured review into a single guided experience. A user can submit a text-based PDF, DOCX, or TXT file and receive a plain-language account of its purpose, principal clauses, obligations, payment provisions, deadlines, ambiguous language, and matters to discuss with an advocate. The aim is not to replace professional judgment, but to help users approach that conversation with a clearer understanding of the document in front of them.

For new agreements, users can describe a proposed transaction in everyday language and generate an editable, structured draft. Missing or uncertain details remain visible as matters to confirm, while the explainable risk review identifies gaps and lets users apply suggested changes to the working draft. An optional Solidity view offers an educational illustration of how mutually agreed payment conditions might be represented in an escrow blueprint; it is not a deployed or audited financial contract. Together, these capabilities form a practical workflow: interpret an existing document, prepare a first-pass agreement, and review unresolved terms before seeking professional advice.

ClauseChain is delivered as an installable Progressive Web App (PWA), allowing users to add it to a phone’s home screen without a separate native Android or iOS package. For document explanation, text is extracted on the user’s device and transmitted to the configured OpenAI service only after the user explicitly requests analysis; the API key is kept server-side. AI features require an internet connection and a server-side `OPENAI_API_KEY`. The current reader supports text-based PDFs, DOCX, and TXT files; scanned PDFs that require optical character recognition (OCR) are not yet supported. These boundaries are part of the product’s present scope, and the generated explanations and drafts remain informational starting points for review with a qualified Indian advocate.

ClauseChain is designed to make legal work easier to understand and prepare, while keeping final judgment with the user and their advocate. The AI explanation is not a legal opinion; users should compare it with the original document and obtain professional advice before relying on it.

## What the app does

- **Explain a legal document:** upload PDF, DOCX, or TXT; extract text in the browser; request a plain-language summary, clause explanations, obligations, deadlines, risks, unclear terms, and questions for a lawyer.
- **Draft an agreement:** describe a deal in ordinary language and generate a first-pass agreement with editable party and commercial details.
- **Review and improve:** inspect explainable checklist findings, apply suggested clause language or confirmation placeholders, and track actions applied. The percentage is workflow progress, not a legal score.
- **Export:** download TXT or DOCX, or use the browser print dialog to save as PDF.
- **Explore an on-chain blueprint:** view a Solidity escrow starting point tied to the text fingerprint. It is educational output only; it does not deploy a contract or hold funds.
- **Install on a phone:** the site is a Progressive Web App with a home-screen install path and a cached app shell. AI features require an internet connection.

## Privacy and limits

Document text is extracted in the browser and sent to the configured OpenAI endpoint only when a user requests an explanation. The serverless function does not store the request. Uploaded files and drafts are not saved to a ClauseChain account; draft preferences are kept in browser storage. The OpenAI API provider processes submitted text to produce the requested response, so do not upload confidential or personal material unless you have permission and have considered your organisation's data rules.

ClauseChain is an early legal-tech product, not legal advice. It may omit context or misunderstand a clause. It does not verify current law, calculate state stamp duty, guarantee enforceability, or replace an Indian advocate. Scanned PDFs without a text layer need OCR, which is not included. The Solidity output is not audited, deployed, wallet-connected, or suitable for real funds.

## Deploy to Netlify

1. Import this GitHub repository in Netlify using **Add new site/project → Import an existing project**.
2. Keep the base directory and build command empty. `netlify.toml` sets the publish directory to `outputs` and the function directory to `netlify/functions`.
3. In Netlify, open **Project configuration → Environment variables → Add a variable**. Add `OPENAI_API_KEY` with your OpenAI API key. Keep it secret; never put it in this repository or browser code. Optionally set `OPENAI_MODEL` (default `gpt-4.1-mini`).
4. Trigger a new deploy after saving the variable. AI drafting and document explanations call `/.netlify/functions/draft`; browser-based templates remain available if the function is not configured.

## Local development

Use the Netlify CLI from the project root with `netlify dev` to run the static site and function together. Set `OPENAI_API_KEY` in a local `.env` file excluded from Git. Never commit the key.
