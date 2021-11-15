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
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        redirectTo: "",
        pathMatch: 'full'
      },
      {
        path: 'contact',
        component: ContactUsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        component: AboutUsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
