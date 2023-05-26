const db = require("../../config/db");

const updateEmployee = async (req, res) => {
  try {
    var emp = req.params;

    const employee = db.query("UPDATE employee SET ? WHERE id = " + emp.id, [
      emp,
    ]);

    req.io.emit(employee?.id.valueOf() + "updateEmployee", {
      id: employee.id,
    });


    if (!employee) {
      return res
        .status(400)
        .send({ status: 400, message: "No Employee Found" });
    }

    return res
      .status(200)
      .send({ status: 200, message: "Employee Updated Successfully", player });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateEmployee;
