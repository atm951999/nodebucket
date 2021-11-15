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
import { AboutUsComponent } from '../about-us/about-us.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toDo: Item[] = []
  done: Item[] = []
  empId: number

  constructor(public dialog: MatDialog, private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit(): void {
    this.empId = +this.cookieService.get('session_user');
    this.http.get(`/api/employees/${this.empId}/tasks`).subscribe((res: ToDoItems) =>
      {
        if (res)
        {
          this.toDo = res.toDo
          this.done = res.done
        }

      })
  }

  drop(event: CdkDragDrop<any[]>) {

    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the existing list of task items');

      this.updateTaskList(this.empId, this.toDo, this.done);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log('Moved task item to the container');

      this.updateTaskList(this.empId, this.toDo, this.done);
    }
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {

        const item = {
          text: result
        }
        this.http.post(`/api/employees/${this.empId}/tasks`, item).subscribe((res: Item) =>
        {
          if (res)
          {

            this.toDo.push(res)
          }

        })
      }
    });
  }

  updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    const body = {toDo: this.toDo, done: this.done}
    this.http.put(`/api/employees/${empId}/tasks`, body).subscribe((res: ToDoItems) =>
    {
      if (res)
      {
        this.toDo = res.toDo
        this.done = res.done
      }

    })
  }

  deleteTask(taskId: string) {

    if (confirm('Are you sure you want to delete this task?')) {
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);
        this.http.delete(`/api/employees/${this.empId}/tasks/${taskId}`).subscribe((res: ToDoItems) =>
        {
          if (res)
          {
            this.toDo = res.toDo
            this.done = res.done
          }

        })

      }
    }
  }

}
