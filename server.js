const express = require("express");
const environment = require("dotenv").config();
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.set("view engine", "ejs");
const port = 4004;

const threshold = 0.5;

app.get("/", (req, res) => {
  res.render("main", { API_KEY: process.env.CLIENT_API_KEY });
});

app.post("/verify", (req, res) => {

  axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SERVER_API_KEY}&response=${req.body["g-recaptcha-response"]}`,
  })
    .then((result) => {

      let templateVars = { botResult: JSON.stringify(result.data) };

      if (result.data.score < threshold) {
        templateVars["isBot"] = ""
        res.render("results", templateVars);
      };

      if (result.data.success >= threshold) {
        templateVars["isBot"] = "NOT"
        res.render("results", templateVars);
      };
    })
    .catch((e) => {
      console.log(e);
    })
});

app.listen(process.env.PORT || port, () => {
  console.log(`I'll see if you're a bot! ${port}`);
});