const express = require("express");
const { tokenVerification } = require("../../middleware");
const createEmployee = require("./create");
const updateEmployee = require("./update");
const getEmployee = require("./get");
const deleteEmployee = require("./delete");

const router = express.Router();

router.post("/create", tokenVerification, createEmployee);
router.patch("/update/:id", tokenVerification, updateEmployee);
router.get('/get', tokenVerification, getEmployee);
router.delete('/deleted', tokenVerification, deleteEmployee);


module.exports = router;
