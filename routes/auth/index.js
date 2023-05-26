const express = require("express");
const loginUser = require("./login");
const signupWithEmail = require("./signup/signup-with-email");

const router = express.Router();

// User
router.post("/register/email", signupWithEmail);
router.post("/login", loginUser);


module.exports = router;
