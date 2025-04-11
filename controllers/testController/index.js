const db = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../utils/emails/sendEmail");

const { testCall } = require("../../models/test");

module.exports = {
    test: (req, res) => {
        db.query("USE " + process.env.PROD_DB_NAME + "; " + testCall, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        });
        res.json("test route is working");
    }
};