export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <h1>tptest Next.js</h1>
      <p>Site: {process.env.SITE_NAME ?? "unnamed"}</p>
      <p>
        <a href="/api/pdf">Make a PDF through Gotenberg</a>
      </p>
    </main>
  );
}
