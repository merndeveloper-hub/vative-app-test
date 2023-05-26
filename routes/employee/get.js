const db = require('../../config/db');

const getEmployee = async (req, res) => {
  try {
    const employee = db.query("SELECT * FROM employee");

    req.io.emit(employee?.id.valueOf() + "getEmployee", {
      id: employee.id,
    });

    if (!employee) {
      return res.status(200).json({ status: 500, msg: "Oops no employee found" });
    }

    return res.status(200).json({
      status: 200,
      msg: employee,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getEmployee;
