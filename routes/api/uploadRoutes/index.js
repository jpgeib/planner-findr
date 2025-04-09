const router = require("express").Router();
const { upload, handleUpload } = require("../../../controllers/uploadController");

router.post("/", upload, handleUpload);

module.exports = router;