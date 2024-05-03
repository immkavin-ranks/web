import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const countLetters = (req, res, next) => {
  
  next();
};

app.use(countLetters);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  let name = req.body["fName"] + " " + req.body["lName"];
  let number = name.length - 1;
  res.render("index.ejs", { name: name, number: number });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
