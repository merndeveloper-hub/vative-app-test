const db = require('../../config/db');

const createEmployee = async (req, res) => {
  try {

var emp = req.body
var empData = [emp.name, emp.salary]

const employee = db.query('INSERT INTO employee(name,salary) values(?)',[empData])

req.io.emit(employee?.id.valueOf() + "createEmployee", {
  id: employee.id,
});


    return res.status(200).send({ status: 200, employee });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = createEmployee;
