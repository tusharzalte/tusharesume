const puppeteer = require('puppeteer');
const User = require("../models/userModel");
const bcypt = require('bcrypt');
const generateCaptcha = require('../utils/generateCaptcha');

const captcha = async (request, response) => {
    const captcha = generateCaptcha();
    request.session.captcha = captcha;
    response.send(captcha);
};

const screenshot = async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const responsePage = await page.goto(`${process.env.LINKEDIN_URL}/${req.query.username}`);

    response.end(await responsePage.text());

    await browser.close();
};

const userLogin = async (request, response) => {
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
};

const userRegister = async (request, response) => {
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
                    const genSalt = await bcypt.genSalt(Number(process.env.SALT_ROUNDS));
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
};

const userUpdate = async (request, response) => {
    try {
        await User.findOneAndUpdate({ _id: request.body._id }, request.body);
        const user = await User.findOne({ _id: request.body._id });
        response.send(user);
    } catch (error) {
        response.status(400).json(error);
    }
};


module.exports = {
    captcha,
    screenshot,
    userLogin,
    userRegister,
    userUpdate
}
