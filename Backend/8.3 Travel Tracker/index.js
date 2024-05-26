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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const country_name = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || LOWER($1) || '%'",
      [country_name]
    );
    if (result.rows.length !== 0) {
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [result.rows[0].country_code]
        );
        res.redirect("/");
      } catch (err) {
        const countries = await checkVisisted();
        res.render("index.ejs", {
          error: "Country already visited",
          total: countries.length,
          countries: countries,
        });
      }
    } else {
      throw "Country not found";
    }
  } catch (err) {
    const countries = await checkVisisted();

    res.render("index.ejs", {
      error: err,
      total: countries.length,
      countries: countries,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
