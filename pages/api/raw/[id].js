import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).send("id required");

  try {
    const key = `paste:${id}`;
    const content = await redis.get(key);
    if (content == null) return res.status(404).send("Not found");

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(String(content));
  } catch (err) {
    console.error(err);
    return res.status(500).send("read error");
  }
}
