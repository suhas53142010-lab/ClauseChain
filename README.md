# ClauseChain

**A plain-language legal document companion for India.** ClauseChain helps people and small businesses move from legal complexity to informed review. Users can upload a contract and receive a readable explanation of its key provisions, obligations, deadlines, unclear language, and questions to raise with an advocate. They can also describe a proposed deal in everyday language and create an editable agreement draft with a transparent review checklist.

## Hackathon concept

Legal documents can be difficult to interpret even when someone knows they need to sign or act on them. ClauseChain brings document comprehension and contract preparation into one accessible, India-focused workflow. A user can submit a text-based PDF, DOCX, or TXT file and receive a plain-language explanation of its purpose, key clauses, obligations, payment terms, deadlines, ambiguities, and questions to raise with an advocate. They can also describe a proposed transaction in everyday language and create an editable, structured agreement draft, then use an explainable risk review to identify missing details and apply suggested changes. An optional Solidity view illustrates how agreed payment logic could be represented in an escrow blueprint.

ClauseChain is delivered as an installable Progressive Web App, so users can add it to a phone’s home screen without installing a separate native Android or iOS package. Document text is extracted on the device, and it is sent to the configured OpenAI service only when the user requests an explanation; the API key remains on the server. AI features require an internet connection and a server-side `OPENAI_API_KEY`. Scanned PDFs without a selectable text layer need OCR, which is not included in the current version. These implementation boundaries are stated clearly so users know what the product can do today.

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
