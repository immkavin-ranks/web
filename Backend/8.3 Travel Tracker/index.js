import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  password: "pg",
  host: "localhost",
  database: "world",
  port: 5432,
});

const app = express();
const port = 3000;

db.connect();

let countries = [];
db.query("SELECT country_code FROM visited_countries", (err, res) => {
  if (err) {
    console.error(err.stack);
  } else {
    res.rows.forEach((country) => {
      countries.push(country.country_code);
    });
  }
  db.end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
