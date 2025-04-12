const router = require("express").Router();
const { addProvider, getProviders, getProvider, updateProvider, deleteProvider } = require("../../../controllers/providerController");

router.get("/", getProviders);
router.get("/:id", getProvider);
router.post("/", addProvider);
router.delete("/:id", deleteProvider);
router.put("/:id", updateProvider);

module.exports = router;