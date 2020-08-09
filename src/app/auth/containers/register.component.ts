import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';
import { take } from 'rxjs/operators';
import { Register } from '../models/Register';

@Component({
  selector: 'app-auth-register',
  template: `
    <h4 class="mb-3">Register now</h4>
    <app-auth-register-form
      [loading]="loading"
      (submitted)="handleRegister($event)">
    </app-auth-register-form>
    <div class="text-center">
      Already registered?
      <a routerLink="/auth/login">Login now!</a>
    </div>
  `
})

export class RegisterComponent {

  loading: boolean;

  constructor(private auth: AuthService) { }

  handleRegister(payload: Register) {
    this.loading = true;
    this.auth.register(payload).pipe(take(1)).subscribe(
      data => this.loading = false
    );
  }
}
