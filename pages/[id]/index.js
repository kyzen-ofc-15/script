import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewPage() {
  const router = useRouter();
  const { id } = router.query;
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/get?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((j) => {
        setPaste(j?.content ?? null);
        setLoading(false);
      })
      .catch(() => {
        setPaste(null);
        setLoading(false);
      });
  }, [id]);

  if (!id) return <div style={{ padding: 20 }}>Loading...</div>;
  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!paste) return <div style={{ padding: 20 }}>Paste not found.</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Inter, sans-serif" }}>
      <h2>Paste: {id}</h2>
      <pre style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: 16 }}>{paste}</pre>
      <p style={{ marginTop: 10 }}>
        Raw: <a href={`/${id}/raw`}>{`/${id}/raw`}</a>
      </p>
    </div>
  );
}
