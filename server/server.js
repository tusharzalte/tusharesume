const express = require("express");
const app = express();
const dbConnect = require("./utils/dbConnect");
const port = process.env.PORT || 5000;
const routes = require("./routes/routes");
const path = require("path");
const session = require("express-session");
const dotenv = require('dotenv');
const cors = require("cors");
const secretKey = require('./utils/generateCaptcha')

dotenv.config(process.env.NODE_ENV === "production" ? { path: 'prod.env' } : { path: 'env' });
dbConnect();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: secretKey(),
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/api/user/", routes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => res.send("Resume Builder"));
app.listen(port, () => console.log(`Resume Builder app listening on port ${port}!`));
