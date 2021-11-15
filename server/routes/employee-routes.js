/*
============================================
; Title: Assignment Week 3
; Author: Professor Krasso
; Date: 07 November 2021
; Modified By: Angela Martin
; Description: This program demonstrates the
; use of The MEAN stack.
===========================================
*/

// Requirements
const express = require('express');

const router = express.Router();

const Employee = require("../models/employee");


router.get("/employees/:id", (req, res) => {
  try {
      const id = req.params.id
      Employee.findOne({"employeeId": id}, function(error, employee) {
          if (error) res.status(501).send("MongoDB exception")
          else res.send(employee);
      });

  } catch (error) {
      res.status(500).send("server exception")
  }
})

router.get("/employees/:id/tasks", (req, res) => {
  try {
      const id = req.params.id
      Employee.findOne({"employeeId": id}, function(error, employee) {
          if (error) res.status(501).send("MongoDB exception")
          else{
            const tasks = {
              toDo: employee.toDo,
              done: employee.done
            }
            res.send(tasks);
          }

      });

  } catch (error) {
      res.status(500).send("server exception")
  }
})

router.post("/employees/:id/tasks", (req, res) => {
  try {
    const id = req.params.id
      Employee.findOne({"employeeId": id}, function(error, employee) {
          if (error) res.status(501).send("MongoDB exception: Failed to fetch employee")
          else if(employee){
            const item = {
              text: req.body.text
            }
            employee.toDo.push(item)
              employee.save((error, employee) => {
                  if(error) {
                    console.error(error)
                    res.status(501).send("MongoDB exception: Failed to save employee")
                  }
                  else res.send(employee.toDo.slice(-1)[0]);
              });
          }
          else if(!employee) res.status(401).send("Employee does not exist")
      });

  }

  catch(error) {
      res.status(500).send("server exception")
  }
})

router.put("/employees/:id/tasks", (req, res) => {
  try {
    const id = req.params.id
      Employee.findOne({"employeeId": id}, function(error, employee) {
          if (error) res.status(501).send("MongoDB exception: Failed to fetch employee")
          else if(employee){
            employee.toDo = req.body.toDo
            employee.done = req.body.done
            employee.save((error, employee) => {
                if(error) {
                  console.error(error)
                  res.status(501).send("MongoDB exception: Failed to save employee")
                }
                else {
                  const tasks = {
                    toDo: employee.toDo,
                    done: employee.done
                  }
                  res.send(tasks);
                }
            });
          }
          else if(!employee) res.status(401).send("Employee does not exist")
      });

  }

  catch(error) {
      res.status(500).send("server exception")
  }
})

router.delete("/employees/:empId/tasks/:taskId", (req, res) => {
  try {
    const empId = req.params.empId
      Employee.findOne({"employeeId": empId}, function(error, employee) {
          if (error) res.status(501).send("MongoDB exception: Failed to fetch employee")
          else if(employee){
            const taskId = req.params.taskId

            employee.toDo = employee.toDo.filter(task => task._id != taskId)
            employee.done = employee.done.filter(task => task._id != taskId)
            employee.save((error, employee) => {
                if(error) {
                  console.error(error)
                  res.status(501).send("MongoDB exception: Failed to save employee")
                }
                else {
                  const tasks = {
                    toDo: employee.toDo,
                    done: employee.done
                  }
                  res.send(tasks);
                }
            });
          }
          else if(!employee) res.status(401).send("Employee does not exist")
      });

  }

  catch(error) {
      res.status(500).send("server exception")
  }
})



module.exports = router
