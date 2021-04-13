const express = require("express");
const app = express();
const port = 5000;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

const path = require("path");

app.use("/", express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
// app.use("/api/art", express.static(path.join(__dirname, "../frontend/build")));
// app.use("/api/work", express.static(path.join(__dirname, "../frontend/build")));

app.get("/api/art", (req, res) => {
  const art = db.get("art").value();
  console.log("art:", art);
  res.json(art);
});

app.get("/api/work", (req, res) => {
  const work = db.get("work").value();
  console.log("work:", work);
  res.json(work);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
