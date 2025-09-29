import fs from "fs";
import path from "path";

const ROOT_DIR = path.join(process.cwd(), "api_files");
const BINARY_EXTS = new Set(["png","jpg","jpeg","webp","gif","ico","wasm","zip","pdf","exe","bin"]);
const MIME = {
  txt: "text/plain",
  md: "text/markdown",
  json: "application/json",
  js: "application/javascript",
  css: "text/css",
  html: "text/html",
  lua: "text/plain",
  py: "text/plain",
  rs: "text/plain",
  java: "text/plain",
  go: "text/plain",
  toml: "text/plain",
  yml: "text/plain",
  yaml: "text/plain",
  csv: "text/csv",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  wasm: "application/wasm",
  pdf: "application/pdf"
};

function contentTypeFor(name) {
  const ext = (name.includes(".") ? name.split(".").pop().toLowerCase() : "");
  if (!ext) return "text/plain; charset=utf-8";
  if (MIME[ext]) {
    if (MIME[ext].startsWith("text/") || MIME[ext] === "application/json" || MIME[ext] === "application/javascript") {
      return `${MIME[ext]}; charset=utf-8`;
    }
    return MIME[ext];
  }
  if (BINARY_EXTS.has(ext)) return "application/octet-stream";
  return "text/plain; charset=utf-8";
}

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
      if (req.query.format === "json") return res.status(200).json({ files });
      const text = files.length ? files.join("\n") : "(no files)";
      return res.status(200).setHeader("Content-Type", "text/plain; charset=utf-8").send(text);
    }

    const safePath = safeJoin(ROOT_DIR, requested);
    if (!fs.existsSync(safePath)) {
      const files = listFiles(ROOT_DIR);
      if (req.query.format === "json") return res.status(404).json({ error: "Not found", files });
      return res.status(404).setHeader("Content-Type", "text/plain; charset=utf-8").send(`File not found: ${requested}\n\nAvailable files:\n${files.join("\n")}`);
    }

    const stat = fs.statSync(safePath);
    if (stat.isDirectory()) {
      const files = listFiles(safePath, requested);
      if (req.query.format === "json") return res.status(200).json({ files });
      const text = files.length ? files.join("\n") : "(empty directory)";
      return res.status(200).setHeader("Content-Type", "text/plain; charset=utf-8").send(text);
    }

    const ext = (requested.includes(".") ? requested.split(".").pop().toLowerCase() : "");
    const isBinaryLikely = BINARY_EXTS.has(ext);
    const forceRaw = req.query.raw === "1" || req.query.raw === "true";

    if (isBinaryLikely || forceRaw) {
      res.setHeader("Content-Type", contentTypeFor(requested));
      res.setHeader("Content-Length", stat.size.toString());
      const stream = fs.createReadStream(safePath);
      stream.pipe(res);
      stream.on("error", () => res.status(500).end("Stream error"));
      return;
    }

    const ct = contentTypeFor(requested);
    const data = fs.readFileSync(safePath);
    res.setHeader("Content-Type", ct);
    return res.status(200).send(data.toString("utf8"));
  } catch (err) {
    return res.status(500).setHeader("Content-Type", "text/plain; charset=utf-8").send("Server error: " + String(err.message));
  }
}
