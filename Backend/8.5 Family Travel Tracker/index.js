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

async function checkVisisted(user_id) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [user_id]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getColor(user_id) {
  const result = await db.query("SELECT color FROM users WHERE id = $1", [
    user_id,
  ]);
  return result.rows[0].color;
}

app.get("/", async (req, res) => {
  const users = await getUsers();
  const countries = await checkVisisted(currentUserId);
  const color = await getColor(currentUserId);

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
  const color = await getColor(currentUserId);
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
      console.log(err);
      const countries = await checkVisisted(currentUserId);

      res.render("index.ejs", {
        error: "Country already visited",
        users: users,
        color: color,
        countries: countries,
        total: countries.length,
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted(currentUserId);

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
    const user_id = parseInt(req.body.user);
    currentUserId = user_id;
    const color = await getColor(user_id);
    const countries = await checkVisisted(user_id);
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
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
