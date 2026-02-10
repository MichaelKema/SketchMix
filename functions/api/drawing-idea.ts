export async function onRequestPost({ request, env }: { request: Request; env: Record<string, string> }) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing OPENROUTER_API_KEY on server" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Optional safety: only allow known model(s)
  const allowedModels = new Set(["arcee-ai/trinity-mini:free"]);
  if (body?.model && !allowedModels.has(body.model)) {
    return new Response(JSON.stringify({ error: "Model not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional (nice for OpenRouter attribution / analytics):
      // Set HTTP-Referer to your deployed domain once you have it
      "HTTP-Referer": "http://localhost",
      "X-Title": "SketchMix",
    },
    body: JSON.stringify(body),
  });

  const text = await r.text();

  return new Response(text, {
    status: r.status,
    headers: {
      "Content-Type": "application/json",
      // Helps avoid caching surprises:
      "Cache-Control": "no-store",
    },
  });
}
