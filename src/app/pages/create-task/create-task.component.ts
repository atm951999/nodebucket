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

/* Imports */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task: string
  constructor(private matDialog: MatDialogRef<CreateTaskComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.matDialog.close();
  }

  createNewTask(): void {
    this.matDialog.close(this.task);
  }

}
