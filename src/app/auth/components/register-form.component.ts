import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Register } from '../models/Register';

@Component({
  selector: 'app-auth-register-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" formControlName="name" placeholder="Your name.."
               [class.border-danger]="hasError('name')"/>
        <div *ngIf="hasError('name')" class="invalid-feedback d-block">
          Name must be more than 3 chars!
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" class="form-control" formControlName="email" placeholder="Your email.."
               [class.border-danger]="hasError('email')"/>
        <div *ngIf="hasError('email')" class="invalid-feedback d-block">
          Email is not valid!
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" id="password" class="form-control" formControlName="password" placeholder="Your password.."
               [class.border-danger]="hasError('password')"/>
        <div *ngIf="hasError('password')" class="invalid-feedback d-block">
          Password must be more than 8 chars!
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">
          <span *ngIf="loading">Please wait...</span>
          <span *ngIf="!loading">Register</span>
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterFormComponent implements OnInit {

  form: FormGroup;

  @Input() loading: boolean;
  @Output() submitted = new EventEmitter<Register>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [ '', [ Validators.required, Validators.minLength(3) ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.submitted.emit(this.form.value);
    }
  }

  hasError(control: string): boolean {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }
}
