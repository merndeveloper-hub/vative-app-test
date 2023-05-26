const db = require("../../config/db");

const deleteEmployee = async (req, res) => {
  try {
    const userId = req.params.id;

    const employee = db.query("DELETE FROM employee WHERE id = ?", [userId]);

    if (!employee) {
      return res
        .status(404)
        .send({ status: 404, message: "No Employee Found" });
    }

    req.io.emit(employee?.id.valueOf() + "deleteEmployee", {
      id: employee.id,
    });

    return res
      .status(200)
      .send({
        status: 200,
        deletePlayer,
        message: "Employee deleted successfully",
      });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = deleteEmployee;
