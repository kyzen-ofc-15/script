import fs from "fs";
import path from "path";

const ROOT_DIR = path.join(process.cwd(), "api_files");

function safeJoin(root, target) {
  const resolved = path.normalize(path.join(root, target));
  if (!resolved.startsWith(root)) throw new Error("Invalid path");
  return resolved;
}

function listFiles(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let out = [];
  for (const e of entries) {
    const rel = path.posix.join(base, e.name);
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(listFiles(full, rel));
    else out.push(rel);
  }
  return out.sort();
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!fs.existsSync(ROOT_DIR)) fs.mkdirSync(ROOT_DIR, { recursive: true });

  const pathQuery = req.query.path || [];
  const parts = Array.isArray(pathQuery) ? pathQuery : [pathQuery];
  const requested = parts.join("/");

  try {
    if (!requested) {
      const files = listFiles(ROOT_DIR);
      const text = files.length ? files.join("\n") : "(no files)";
      return res.status(200).setHeader("Content-Type", "text/plain; charset=utf-8").send(text);
    }

    const safePath = safeJoin(ROOT_DIR, requested);
    if (!fs.existsSync(safePath)) {
      const files = listFiles(ROOT_DIR);
      return res
        .status(404)
        .setHeader("Content-Type", "text/plain; charset=utf-8")
        .send(`File not found: ${requested}\n\nAvailable files:\n${files.join("\n")}`);
    }

    const stat = fs.statSync(safePath);
    if (stat.isDirectory()) {
      const files = listFiles(safePath, requested);
      const text = files.length ? files.join("\n") : "(empty directory)";
      return res.status(200).setHeader("Content-Type", "text/plain; charset=utf-8").send(text);
    }

    const data = fs.readFileSync(safePath, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(200).send(data);
  } catch (err) {
    return res
      .status(500)
      .setHeader("Content-Type", "text/plain; charset=utf-8")
      .send("Server error: " + String(err.message));
  }
}
