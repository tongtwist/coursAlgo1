import path from "path";
import express from "express";
const __dirname = path.resolve();
const srv = express();
srv.get("/", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
srv.get("/:file", (req, res) => res.sendFile(path.join(__dirname, "public", req.params["file"])));
srv.get("/scripts/:file", (req, res) => res.sendFile(path.join(__dirname, "public", "scripts", req.params["file"])));
const port = 3000;
srv.listen(port, () => console.log(`Serveur en écoute sur http://127.0.0.1:${port}`));
//# sourceMappingURL=index.js.map