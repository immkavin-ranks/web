import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

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
    await db.query("INSERT INTO users(email, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    console.log("registered");
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await db.query(
      "select * from users where email = $1 and password = $2",
      [username, password]
    );
    const user = response.rows[0];
    if (user) {
      console.log("login success" + user);
    } else {
      console.log("please register");
    }
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
