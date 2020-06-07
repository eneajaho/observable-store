import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from '../models/Movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" class="form-control" formControlName="title">
        <div class="alert alert-danger mt-1" *ngIf="invalid('title')">
          You should enter a movie title!
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" id="description" class="form-control" rows="4" formControlName="description"></textarea>
        <div class="alert alert-danger mt-1" *ngIf="invalid('description')">
          You should enter a movie description!
        </div>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="text" id="image" class="form-control" formControlName="image">
        <div class="alert alert-danger mt-1" *ngIf="invalid('image')">
          You should enter a movie image url!
        </div>
      </div>
      <button class="btn btn-primary">Save movie</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MovieFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  @Input() movie: Movie;

  @Output() submitted = new EventEmitter<Movie>();
  @Output() preview = new EventEmitter<Movie>();

  private sub: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [ '', Validators.required ],
      description: [ '', Validators.required ],
      image: [ '', Validators.required ],
    });

    if (this.movie) {
      this.form.patchValue(this.movie);
    }

    this.sub = this.form.valueChanges
      .subscribe(data => {
        if (this.form.valid) {
          this.preview.emit(data);
        }
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.submitted.emit(this.form.value);
    }
  }

  invalid(control: string): boolean {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
