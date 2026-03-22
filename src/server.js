import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

import { readStore, updateProductStock } from "./store.js";

const HOST = "127.0.0.1";
const PORT = 3040;
const PUBLIC_DIR = resolve(import.meta.dirname, "../public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

async function serveStatic(pathname, response) {
  const filePath = pathname === "/" ? resolve(PUBLIC_DIR, "index.html") : resolve(PUBLIC_DIR, `.${pathname}`);
  const type = MIME_TYPES[extname(filePath)] || "text/plain; charset=utf-8";

  try {
    const content = await readFile(filePath);
    response.writeHead(200, { "Content-Type": type });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/api/store") {
    const store = await readStore();
    sendJson(response, 200, store);
    return;
  }

  if (request.method === "POST" && url.pathname.startsWith("/api/products/") && url.pathname.endsWith("/stock")) {
    const id = url.pathname.split("/")[3];
    const body = await readBody(request);
    const parsed = body ? JSON.parse(body) : {};
    const stock = Number(parsed.stock);

    if (!Number.isInteger(stock) || stock < 0) {
      sendJson(response, 400, { error: "Invalid stock" });
      return;
    }

    const updated = await updateProductStock(id, stock);
    if (!updated) {
      sendJson(response, 404, { error: "Product not found" });
      return;
    }

    sendJson(response, 200, { ok: true, product: updated });
    return;
  }

  await serveStatic(url.pathname, response);
});

server.listen(PORT, HOST, () => {
  console.log(`Control de Tienda escuchando en http://${HOST}:${PORT}`);
});
