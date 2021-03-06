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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService,
    private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login() {
    const empId = this.form.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe(res =>
      {
        if (res)
        {
          this.cookieService.set('session_user', empId, 1); // set the employee id to the cookie, session_user name

          this.router.navigate(['/']);
        }
        else
        {
          this.error = 'The employee ID you entered is invalid, please try again.';
        }
      })
  }

}
