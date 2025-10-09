import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

// optional: TTL in seconds (e.g., 7 days). Set to null to never expire.
const TTL_SECONDS = null; // e.g. 60 * 60 * 24 * 7

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { content } = req.body;
  if (!content || !String(content).trim()) return res.status(400).json({ error: "Empty content" });

  try {
    const id = nanoid(8);
    const key = `paste:${id}`;
    await redis.set(key, String(content));
    if (TTL_SECONDS) await redis.expire(key, TTL_SECONDS);

    return res.status(201).json({ id, url: `/${id}`, raw: `/${id}/raw` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Write failed" });
  }
}
