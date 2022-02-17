const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
const port = 4004;
app.set("view engine", "ejs");
const environment = require("dotenv").config();
const axios = require('axios');

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

      if (result.data.success === false) {
        templateVars["isBot"] = ""
        res.render("results", templateVars);
      };

      if (result.data.success === true) {
        templateVars["isBot"] = "NOT"
        res.render("results", templateVars);
      };
    })
    .catch((e) => {
      console.log(e);
    })
});

app.listen(prcoess.env.PORT || port, () => {
  console.log(`I'll see if you're a bot! ${port}`);
});