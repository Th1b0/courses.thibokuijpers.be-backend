const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");
const app = express();
const port = 3000;

const auth = require("./api/routes/auth");
const user = require("./api/routes/user");
const authenticate = require("./api/middleware/authCheck");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://dev.thibokuijpers.be/");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//***MIDDLEWARE */
//cors

app.use(cookieParser("4e5df869-0c80-4024-9fd2-87ba10df5036"));
app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Middleware routes
app.use("/auth", auth);
app.use("/user", user);

//***ROUTES */
app.get("/protected", authenticate, (req, res) => {
  res.json({ user_id: req.user_id });
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
