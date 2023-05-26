const express = require("express");
const User = require("../models/userModel");
const session = require("express-session");
const randomstring = require("randomstring");
const cors = require("cors")
const app = express.Router();
app.use(cors());

app.use(
  session({
    secret: "6gsdgvgeggvfgevfg2356",
    resave: false,
    saveUninitialized: true,
  })
);

function generateCaptcha() {
  return randomstring.generate({
    length: 6,
    charset: "alphanumeric",
  });
}


app.get("/captcha", (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha;
  res.send(captcha);
});


// Create endpoints
app.post("/login", async (request, response) => {
  const userInput = request.body.captchaInput;
  const storedCaptcha = request.session.captcha;

  if (userInput === storedCaptcha) {
    try {
      const result = await User.findOne({
        username: request.body.username,
        password: request.body.password,
      });

      if (result) {
        response.send(result);
      } else {
        response.status(400).json("Login failed");
      }
    } catch (error) {
      response.status(400).json(error);
    }
  } else {
    response.status(400).json("Invalid CAPTCHA");
  }
});


app.post("/register", async (request, response) => {
  const userInput = request.body.captchaInput;
  const storedCaptcha = request.session.captcha;

  if (userInput === storedCaptcha) {
    try {
      const result = await User.findOne({
        username: request.body.username,
      });

      if (result) {
        response.status(400).json("Registration failed");
      } else {
        if (request.body.password === request.body.confirmPassword) {
          const newUser = new User(request.body);
          await newUser.save();

          response.send("Registration Successful");
        } else {
          response.status(400).json("Passwords do not match");
        }
      }
    } catch (error) {
      response.status(400).json(error);
    }
  } else {
    response.status(400).json("Invalid CAPTCHA");
  }
});


app.post("/update", async (request, response) => {
  try {
    await User.findOneAndUpdate({ _id: request.body._id }, request.body);
    const user = await User.findOne({ _id: request.body._id });
    response.send(user);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = app;
