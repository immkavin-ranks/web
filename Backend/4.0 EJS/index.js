import express from "express";

const app = express();
const PORT = 3000;

var day, action;
const dayAndAction = (req, res, next) => {
  let date = new Date();
  let day_index = date.getDay();
  if (day_index == 0 || day_index == 6) {
    day = "the weekend";
    action = "have fun!";
  } else {
    day = "a weekday";
    action = "work hard!";
  }
  next();
};

app.use(dayAndAction);

app.get("/", (req, res) => {
  res.render("index.ejs", { day: day, action: action });
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});
