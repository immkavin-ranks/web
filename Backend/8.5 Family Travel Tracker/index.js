import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "pg",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getUsers() {
  const result = await db.query("SELECT * FROM users");

  return result.rows;
}

let users = await getUsers();
let currentUserId = users[0].id;

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  return countries;
}

async function getColor() {
  const result = await db.query("SELECT color FROM users WHERE id = $1", [
    currentUserId,
  ]);

  return result.rows[0].color;
}

app.get("/", async (req, res) => {
  const users = await getUsers();
  const countries = await checkVisisted();
  const color = await getColor();

  res.render("index.ejs", {
    users: users,
    color: color || "teal",
    countries: countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const users = await getUsers();
  const color = await getColor();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1;",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );

      res.redirect("/");
    } catch (err) {
      // console.error(err.message);
      const countries = await checkVisisted();

      res.render("index.ejs", {
        error: "Country already visited",
        users: users,
        color: color,
        countries: countries,
        total: countries.length,
      });
    }
  } catch (err) {
    // console.error(err.message);
    const countries = await checkVisisted();

    res.render("index.ejs", {
      error: "Country not found",
      users: users,
      color: color,
      countries: countries,
      total: countries.length,
    });
  }
});

app.post("/user", async (req, res) => {
  if (req.body.user) {
    currentUserId = parseInt(req.body.user);
    const color = await getColor();
    const countries = await checkVisisted();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: await getUsers(),
      color: color || "teal",
    });
  } else if (req.body.add) {
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  try {
    const name = req.body.name;
    const color = req.body.color || "teal";
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id, name",
      [name, color]
    );
    // console.log(result.rows);
    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    // console.error(err.message);
    res.render("new.ejs", {
      error: "Something bad happened. Try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
