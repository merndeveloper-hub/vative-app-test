const db = require("../../../config/db")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signupWithEmail = async (req, res) => {
  try {
    const { password, email } = req.body;

    hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Store user details in the database
    const newUser = {
      email: email,
      password: hash,
    };

    const userData = db.query("INSERT INTO users SET ?", newUser);

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "24h",
    });
    req.userId = user._id;
    return res.status(200).send({ status: 200, userData, token });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .send({ status: 400, message: "Invalid username or password" });
  }
};

module.exports = signupWithEmail;
