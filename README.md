# ClauseChain

ClauseChain is a static-first contract drafting website with a Netlify serverless AI drafting endpoint. Drafts and edits are saved in the visitor's browser. The AI function sends the entered brief to OpenAI; configure an API key before enabling it for real users.

## Deploy to Netlify

1. Put this project in a GitHub repository and push the files.
2. In Netlify, choose **Add new site → Import an existing project**, connect the repository, and deploy. `netlify.toml` sets the publish folder (`outputs`) and the Functions folder (`netlify/functions`).
3. In the Netlify site, open **Site configuration → Environment variables** and add `OPENAI_API_KEY` with your own OpenAI API key. Optionally add `OPENAI_MODEL` (default `gpt-4.1-mini`). Keep the key in Netlify; never put it in `outputs/index.html` or commit it to Git.
4. Trigger a new deploy after saving the environment variable. Open the deployed site and try a brief. The **Build my draft** button calls `/.netlify/functions/draft`; if the function or key is unavailable, the local template still works.

## Using the workspace

- Choose a sample brief or describe a deal, then select **Build my draft**. On the deployed Netlify site this calls the server-side AI function. Without the key/function, the browser uses the local structured template.
- Open **Risk review** and use **Apply suggestion**. The app adds a review placeholder to the agreement or enables the selected clause; the percentage counts actions applied, not legal safety.
- Use **PDF** to open the browser print dialog and choose **Save as PDF**. Use **DOCX** to download a Word-compatible document. TXT remains available as a plain-text export.
- The **On-chain** tab produces a Solidity starting point only. It is not deployed or audited and must not be used to hold real funds.

Netlify Drop of the `outputs` folder alone publishes only the static page and does not include the function. Use the Git-connected deploy above (or Netlify CLI with this repository) for AI drafting.

## Product boundaries

- AI output is a starting draft, not legal advice. Review terms and current law with an Indian advocate.
- Risk checks are explainable drafting prompts, not a legal opinion or enforceability score.
- On-chain view generates a Solidity escrow blueprint. This repository does not deploy a contract, connect a wallet, custody funds, convert INR to tokens, or provide audited production escrow.
- Browser storage is local to that browser/device. There is no user account, cloud sync, or multi-user collaboration yet.

## Local development

Use the Netlify CLI from this project root (`netlify dev`) to run the site and function together. Set `OPENAI_API_KEY` in a local `.env` file that is excluded from Git; do not share or commit it.

