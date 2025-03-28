const db = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../utils/emails/sendEmail");

module.exports = {
    test: (req, res) => {
        if (err) return res.json(err);
        db.query(testCall, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
        res.json("test route is working");
    }
};