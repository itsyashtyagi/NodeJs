const express = require("express");
const { handleuserSignUp, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleuserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;