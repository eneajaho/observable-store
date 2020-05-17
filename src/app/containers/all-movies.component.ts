import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Store } from '../store/Store';
import { combineLatest, Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-movies',
  template: `
    <div class="row my-4">
      <div *ngFor="let movie of list$ | async"
           class="col-xs-12 col-sm-6 col-md-4">
        <app-movie-card
          [movie]="movie"
          (added)="handleAdd($event)"
          (removed)="handleRemove($event)">
        </app-movie-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  favorites$: Observable<number[]>;
  list$: Observable<Movie[]>;

  constructor(private appService: AppService, private store: Store) { }

  ngOnInit() {
    this.appService.getFavorites().pipe(take(1)).subscribe();
    this.appService.getMovies().pipe(take(1)).subscribe();

    this.movies$ = this.store.select<Movie[]>('movies');
    this.favorites$ = this.store.select<{ id }[]>('favorites').pipe(
      map(items => items?.map(fav => fav.id))
    );

    this.list$ = combineLatest(this.favorites$, this.movies$).pipe(
      map(([ favorites, movies ]) => movies?.map(movie => {
        return { ...movie, isFavorite: favorites.some(id => movie.id === id) };
      }))
    );

  }

  handleAdd(id: number) {
    this.appService.addFavorite(id).pipe(take(1)).subscribe();
  }

  handleRemove(id: number) {
    this.appService.removeFavorite(id).pipe(take(1)).subscribe();
  }
}
