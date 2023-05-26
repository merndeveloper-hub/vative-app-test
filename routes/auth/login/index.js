const db = require("../../../config/db")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.query("SELECT * FROM users WHERE username = ?", [
      email,
      password,
    ]);
    if (result.length > 0) {
      const user = result[0];

      const passwordIsValid = bcrypt.compareSync(password, user?.password);
      if (!passwordIsValid) {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid Email or Password!" });
      }

      var token = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: "24h",
      });
      req.userId = user._id;

      return res.status(200).send({ status: 200, user, token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;

