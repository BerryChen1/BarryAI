import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const previewRoot = path.resolve(here, "..", "preview-site");
const app = express();

app.use(express.static(previewRoot));
app.get("*", (_request, response) => {
  response.sendFile(path.join(previewRoot, "index.html"));
});

app.listen(4173, "127.0.0.1", () => {
  console.log("Preview ready at http://127.0.0.1:4173");
});
