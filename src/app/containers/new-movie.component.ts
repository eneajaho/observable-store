import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppService } from '../services';
import { Movie } from '../models';

@Component({
  selector: 'app-new-movie',
  template: `
    <div class="row justify-content-between my-4">
      <div class="col-12 col-md-7">
        <div class="mb-3">
          <button class="btn btn-light" routerLink="/movies">Go back</button>
        </div>
        <h3 class="mb-4">Add new movie</h3>
        <app-movie-form
          (submitted)="addMovie($event)"
          (preview)="handlePreview($event)">
        </app-movie-form>
      </div>
      <div *ngIf="preview$ | async as preview" class="col-12 col-md-4">
        <app-movie-card isPreview="true" [movie]="preview"></app-movie-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewMovieComponent {

  preview$: Observable<Movie>;

  constructor(private appService: AppService, private router: Router) { }

  addMovie(movie: Movie) {
    this.appService.addMovie(movie).pipe(take(1)).subscribe(res => {
      this.router.navigate([ 'movies', res.id ]);
    });
  }

  handlePreview(movie: Movie) {
    this.preview$ = of(movie);
  }
}
