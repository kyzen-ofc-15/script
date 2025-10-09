import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return alert("Content kosong");
    setLoading(true);
    try {
      const res = await fetch("/api/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });
      const json = await res.json();
      if (json?.id) {
        const rawPath = `/${json.id}/raw`;
        // redirect to raw page
        window.location.href = rawPath;
      } else {
        alert("Gagal membuat paste");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error saat membuat paste");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Inter, sans-serif" }}>
      <h1>Simple Paste</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          style={{ width: "100%", fontFamily: "monospace", fontSize: 14 }}
          placeholder="Paste your code or text here..."
        />
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading} style={{ padding: "8px 14px" }}>
            {loading ? "Saving..." : "Paste"}
          </button>
        </div>
      </form>

      {url && (
        <div style={{ marginTop: 16 }}>
          <a href={url}>{url}</a>
        </div>
      )}

      <p style={{ marginTop: 20, color: "#666" }}>
        After creating, you'll be redirected to the raw URL (`/id/raw`).
      </p>
    </div>
  );
}
