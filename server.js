import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let entries = [];

app.get("/", (req, res) => {
  res.render("index", { entries });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/submit", (req, res) => {
  const { name } = req.body;
  if (name) entries.push(name);
  res.redirect("/"); 
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}/`);
});
