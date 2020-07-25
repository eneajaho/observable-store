import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllMoviesFacade } from '../facades';
import { Movie } from '../models';

@Component({
  selector: 'app-all-movies',
  template: `
    <div class="row my-4">
      <div class="col-12 col-sm-12 col-md-12 col-lg-9">
        <div class="row justify-content-center">
          <ng-container *ngIf="movies$ | async as movies; else loading">
            <div *ngFor="let movie of movies"
                 class="col-xs-12 col-sm-6 mb-4">
              <app-movie-card
                [movie]="movie"
                (added)="handleAdd($event)"
                (removed)="handleRemove($event)">
              </app-movie-card>
            </div>
          </ng-container>
          <ng-template #loading>
            <div class="spinner-border text-primary mt-4" style="width: 3rem; height: 3rem;" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-3"
           style="position: sticky; top: 70px; height: fit-content;">
        <app-favorites
          [movies]="favorites$ | async"
          (removed)="handleRemove($event)">
        </app-favorites>
      </div>
    </div>
  `,
  providers: [ AllMoviesFacade ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  favorites$: Observable<Movie[]>;

  constructor(private facade: AllMoviesFacade) {}

  ngOnInit() {
    this.movies$ = this.facade.movies;
    this.favorites$ = this.facade.favorites;
  }

  handleAdd(id: number) {
    this.facade.addFavorite(id);
  }

  handleRemove(id: number) {
    this.facade.removeFavorite(id);
  }
}
