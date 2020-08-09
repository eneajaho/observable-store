import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent, LoginComponent, RegisterComponent } from './containers';
import { LoginFormComponent, RegisterFormComponent } from './components';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
