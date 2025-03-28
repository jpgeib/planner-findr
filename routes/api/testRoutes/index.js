const router = require("express").Router();
const { test } = require("../../../controllers/testController");

router.get("/", (req, res) => {
    res.json("test route is working");
});

module.exports = router;