export const dynamic = "force-dynamic";

// Converts a small HTML page to a PDF through Gotenberg (GOTENBERG_URL,
// for example http://gotenberg:3000). Returns the PDF.
export async function GET() {
  const base = process.env.GOTENBERG_URL;
  if (!base) {
    return Response.json({ error: "GOTENBERG_URL is not set" }, { status: 500 });
  }
  const html = `<!doctype html><html><body><h1>tptest invoice</h1><p>${new Date().toISOString()}</p></body></html>`;
  const form = new FormData();
  form.append("files", new Blob([html], { type: "text/html" }), "index.html");
  const res = await fetch(`${base.replace(/\/$/, "")}/forms/chromium/convert/html`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    return Response.json(
      { error: `gotenberg answered ${res.status}`, body: (await res.text()).slice(0, 500) },
      { status: 502 },
    );
  }
  return new Response(await res.arrayBuffer(), {
    headers: { "content-type": "application/pdf" },
  });
}
