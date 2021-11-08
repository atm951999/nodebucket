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
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu'

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
