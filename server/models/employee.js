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

const itemSchema = require("./item")

const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
  employeeId: {type: Number, unique: true},
  firstName: String,
  lastName: String,
  toDo: [itemSchema],
  done: [itemSchema]
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
