const TYPES = new Set(["svc", "nda", "rent", "sale", "loan", "job", "prtn", "intern"]);

export default async (request) => {
  if (request.method !== "POST") return Response.json({ error: "Use POST." }, { status: 405 });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error: "AI is not configured yet. Add OPENAI_API_KEY in Netlify environment variables." }, { status: 503 });
  try {
    const body = await request.json();
    const brief = String(body.brief || "").trim().slice(0, 5000);
    if (!brief) return Response.json({ error: "Describe the agreement first." }, { status: 400 });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: "You help prepare review-ready Indian commercial agreement drafts. Extract facts conservatively. Never invent names, dates, amounts, legal conclusions, statutory duties, or missing commercial terms. Use [TO CONFIRM] when essential information is absent. Return only valid JSON with type (svc, nda, rent, sale, loan, job, prtn, intern), a, b, city, subject, amount (number INR, 0 if unknown), months (number, 0 if unknown), notice (number, 0 if unknown), and draft (complete agreement in plain text, with clauses, schedules or placeholders, signature blocks, and a short explicit review notice). Clearly label assumptions and unresolved terms. Do not claim the draft is legally valid or ready to sign. This is informational drafting support, not legal advice.",
        input: `Create a first-pass agreement from this brief. Preserve the parties' intent and flag missing terms as [TO CONFIRM].\n\n${brief}`,
        text: { format: { type: "json_object" } },
        max_output_tokens: 3500,
        store: false
      })
    });
    const payload = await response.json();
    if (!response.ok) return Response.json({ error: payload.error?.message || "The drafting service could not complete this request." }, { status: response.status >= 500 ? 502 : response.status });
    const text = payload.output?.flatMap(item => item.content || []).find(item => item.type === "output_text")?.text;
    if (!text) throw new Error("The model returned no draft.");
    const result = JSON.parse(text);
    if (!TYPES.has(result.type) || typeof result.draft !== "string" || !result.draft.trim()) throw new Error("The generated response was incomplete. Please try again.");
    return Response.json({ ...result, draft: result.draft.slice(0, 30000) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: error.message || "Could not prepare the draft." }, { status: 400 });
  }
};


