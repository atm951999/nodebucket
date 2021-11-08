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
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ToDoItems, Item } from 'src/app/models/item-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toDo: Item[] = []
  done: Item[] = []

  constructor(public dialog: MatDialog, private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit(): void {
    const empId = this.cookieService.get('session_user');
    this.http.get(`/api/employees/${empId}/tasks`).subscribe((res: ToDoItems) =>
      {
        if (res)
        {
          this.toDo = res.toDo
          this.done = res.done
        }

      })
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        const empId = this.cookieService.get('session_user');
        const item = {
          text: result
        }
        this.http.post(`/api/employees/${empId}/tasks`, item).subscribe((res: Item) =>
        {
          if (res)
          {

            this.toDo.push(res)
          }

        })
      }
    });
  }

}
