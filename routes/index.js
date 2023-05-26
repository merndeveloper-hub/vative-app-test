const express = require("express");
const employee = require("./employee");
const auth = require('./auth')
const router = express.Router();



// USER Routes * *
 router.use("/employee", employee);
 router.use("/auth", auth);

 
module.exports = router;
