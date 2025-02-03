const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/emailController");

router.post("/sendemail", sendEmail);

module.exports = router;
