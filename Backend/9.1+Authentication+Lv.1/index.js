import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { render } from "ejs";

const db = new pg.Client({
  user: "postgres",
  database: "secrets",
  host: "localhost",
  port: 5432,
  password: "pg",
});

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (response.rows > 0) {
      res.send("User already exists.");
    } else {
      const result = await db.query(
        "INSERT INTO users(email, password) VALUES ($1, $2)",
        [username, password]
      );
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    const user = response.rows[0];
    if (user) {
      if (user.password === password) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("please register");
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
