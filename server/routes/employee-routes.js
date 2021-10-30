// Requirements
const express = require('express');

const router = express.Router();

const Employee = require("../models/employee");


router.get("/employees/:id", (req, res) => {
  try {
      const id = req.params.id
      Employee.findOne({"employeeId": id}, function(error, employee) {
          if (error) res.status(501).send("MongoDB exception")
          res.send(employee);
      });

  } catch (error) {
      res.status(500).send("server exception")
  }
})

module.exports = router
