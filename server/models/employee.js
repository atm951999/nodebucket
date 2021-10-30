const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
  _id: String,
  task: String
})

const employeeSchema = new Schema ({
  employeeId: Number,
  firstName: String,
  lastName: String,
  toDo: [taskSchema],
  done: [taskSchema]
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
