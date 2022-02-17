const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
const port = 4004;
app.set("view engine", "ejs");
const environment = require("dotenv").config();

app.get("/", (req, res) => {
  res.render("main", { API_KEY: process.env.CLIENT_API_KEY });
});

app.post("/verify", (req, res) => {
  console.log(req.body)
  res.render("results");
});

app.listen(port, () => {
  console.log(`I'll see if you're a bot! ${port}`);
});