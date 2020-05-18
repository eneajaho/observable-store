import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Store } from '../store/Store';
import { combineLatest, Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { map, take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-all-movies',
  template: `
    <div class="row my-4">
      <div class="col-9">
        <div class="row">
          <div *ngFor="let movie of moviesList$ | async"
              class="col-xs-12 col-sm-6">
            <app-movie-card
              [movie]="movie"
              (added)="handleAdd($event)"
              (removed)="handleRemove($event)">
            </app-movie-card>
          </div>
        </div>
      </div>
      <div class="col-3">
        <app-favorites 
          [movies]="favoritesList$ | async" 
          (removed)="handleRemove($event)">
        </app-favorites>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  favorites$: Observable<number[]>;

  moviesList$: Observable<Movie[]>;
  favoritesList$: Observable<Movie[]>;

  constructor(private appService: AppService, private store: Store) { }

  ngOnInit() {
    this.appService.getFavorites().pipe(take(1)).subscribe();
    this.appService.getMovies().pipe(take(1)).subscribe();

    this.movies$ = this.store.select<Movie[]>('movies');
    this.favorites$ = this.store.select<{ id }[]>('favorites').pipe(
      map(items => items?.map(fav => fav.id))
    );

    this.moviesList$ = combineLatest(this.favorites$, this.movies$).pipe(
      map(([favorites, movies]) => movies?.map(movie => {
        return {
          ...movie,
          isFavorite: favorites.some(id => movie.id === id)
        };
      }))
    );

    this.favoritesList$ = this.moviesList$.pipe(
      map(movies => movies.filter(movie => movie.isFavorite))
    );
  }

  handleAdd(id: number) {
    this.appService.addFavorite(id).pipe(take(1)).subscribe();
  }

  handleRemove(id: number) {
    this.appService.removeFavorite(id).pipe(take(1)).subscribe();
  }
}
