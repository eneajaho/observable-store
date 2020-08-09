import { Component } from '@angular/core';
import { Login } from '../models/Login';
import { AuthService } from 'src/app/services';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-auth-login',
  template: `
    <h4 class="mb-3">Login now</h4>
    <app-auth-login-form
      [loading]="loading"
      (submitted)="handleLogin($event)">
    </app-auth-login-form>
    <div class="text-center">
      Don't have an account?
      <a routerLink="/auth/register">Register now!</a>
    </div>
  `
})
export class LoginComponent {

  loading: boolean;

  constructor(private auth: AuthService) { }

  handleLogin(payload: Login) {
    this.loading = true;
    this.auth.login(payload).pipe(take(1)).subscribe(
      res => this.loading = false
    );
  }
}
