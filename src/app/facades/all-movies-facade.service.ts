import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppService } from '../services';
import { Store } from '../store';
import { Movie } from '../models';

@Injectable()
export class AllMoviesFacade {

  constructor(private appService: AppService, private store: Store) { }

  private movies$ = this.store.select<Movie[]>('movies');
  private favorites$ = this.store.select<{ id }[]>('favorites');

  get movies(): Observable<Movie[]> {
    return combineLatest(this.favorites$, this.movies$).pipe(
      map(([ favorites, movies ]) => movies?.map(movie => {
        return { ...movie, isFavorite: favorites?.some(fav => movie.id === fav.id) };
      })),
    );
  }

  get favorites(): Observable<Movie[]> {
    return this.movies.pipe(
      map(movies => movies.filter(movie => movie.isFavorite))
    );
  }

  addFavorite(id: number) {
    this.appService.addFavorite(id).pipe(take(1)).subscribe();
  }

  removeFavorite(id: number) {
    this.appService.removeFavorite(id).pipe(take(1)).subscribe();
  }

}
