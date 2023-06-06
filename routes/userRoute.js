const express = require("express");
const puppeteer = require('puppeteer');
const User = require("../models/userModel");
const Skill = require('../models/skillSchema');
const session = require("express-session");
const randomstring = require("randomstring");
const bcypt = require('bcrypt');
const cors = require("cors");
const app = express.Router();
const saltRounds = 10;

const bodyParser = require('body-parser');

const secretKey = randomstring.generate({
  length: 32, // You can adjust the length of the secret key as needed
  charset: "alphanumeric",
});
app.use(cors());
app.use(
  session({
    secret: secretKey,
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

app.get('/screenshot', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const response = await page.goto(`https://www.linkedin.com/in/${req.query.username}`);

  res.end(await response.text());

  await browser.close();
})


// Create endpoints
app.post("/login", async (request, response) => {
  const userInput = request.body.captchaInput;
  const storedCaptcha = request.session.captcha;

  if (userInput === storedCaptcha) {
    try {
      const result = await User.findOne({
        username: request.body.username
      });

      if (result) {
        const passwordDecode = await bcypt.compare(request.body.password, result.password);
        if (passwordDecode) {
          response.send(result);
        } else {
          response.status(400).json("Login failed");
        }
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
          const genSalt = await bcypt.genSalt(saltRounds);
          const hashPassword = await bcypt.hash(request.body.password, genSalt);
          request.body.password = hashPassword;
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
app.get("/assessSkills", async (req, res) => {
  Skill.find()
    .then((skills) => res.json(skills))
    .catch((err) => res.status(400).json('Error: ' + err));
});
// Add a new skill
app.post("/add", async (req, res) => {
  const name = req.body.name;
  const level = Number(req.body.level);

  const newSkill = new Skill({ name, level });

  newSkill
    .save()
    .then(() => res.json('Skill added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = app;