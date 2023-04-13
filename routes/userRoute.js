const express = require("express");
const User = require("../models/userModel");
const app = express.Router();

// Create endpoints
app.post("/login", async (request, response) => {
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
});

app.post("/register", async (request, response) => {
  try {
    const result = await User.findOne({
      username: request.body.username,
    });

    if (result) {
      response.status(400).json("Registration failed");
    } else {
      if (request.body.password == request.body.confirmPassword) {
        const newUser = new User(request.body);
        await newUser.save();

        response.send("Registration Successfull");
      } else {
        response.status(400).json("Registration failed");
      }
    }
  } catch (error) {
    response.status(400).json(error);
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
