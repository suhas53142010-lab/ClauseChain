# ClauseChain

Netlify-ready contract drafting website for the AI for Lawyers India PS-03 hackathon.

## Deploy on Netlify
1. Import this GitHub repository in Netlify.
2. Add `OPENAI_API_KEY` in Site configuration → Environment variables.
3. Deploy. `netlify.toml` publishes `outputs/` and deploys `netlify/functions/draft.mjs`.

The AI function sends the brief to OpenAI. Keep the key in Netlify and do not commit it. Browser templates work as a fallback. Risk suggestions are review placeholders, not legal advice. PDF uses the browser print dialog; DOCX creates a Word-compatible file. Solidity output is a blueprint only and is not deployed or audited.

See `README.md` in the local project for extended setup details.