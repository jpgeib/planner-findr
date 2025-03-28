const db = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../utils/emails/sendEmail");

module.exports = {
    register: (req, res) => {
        res.json("register route");
    },
    login: (req, res) => {
        res.json("login route");
    },
    forgotPassword: (req, res) => {
        res.json("forgot password route");
    },
    resetPassword: (req, res) => {
        res.json("reset password route");
    },
    logout: (req, res) => {
        res.json("logout route");
    },
}