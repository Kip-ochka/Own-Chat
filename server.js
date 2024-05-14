import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("./dist"));

app.get("/", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/sign-up", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/messenger", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/settings", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/settings-edit", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/password-edit", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/error500", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get("/error404", (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
