//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

// body-parser built in with express
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

var page;
const check = (req, res, next) => {
  if (req.body["password"] === "ILoveProgramming") {
    page = "secret";
  } else {
    page = "index";
  }
  next();
};

app.use(check);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  res.sendFile(__dirname + `/public/${page}.html`);
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
