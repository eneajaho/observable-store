import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, exhaustMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Movie } from '../models';
import { Store } from '../store';

@Injectable({ providedIn: 'root' })
export class AppService {

  private readonly api = environment.api;

  constructor(private http: HttpClient, private store: Store) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api}/movies`).pipe(
      tap(res => this.store.set('movies', res))
    );
  }

  getFavorites(): Observable<{ id: number }[]> {
    return this.http.get<{ id: number }[]>(`${this.api}/favorites`).pipe(
      tap(res => this.store.set('favorites', res))
    );
  }


  addMovie(movie: Movie): Observable<any> {
    return this.http.post(`${this.api}/movies`, movie).pipe(
      tap((res: Movie) => this.store.setItem('movies', res.id, res))
    );
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put(`${this.api}/movies/${movie.id}`, movie).pipe(
      tap((res: Movie) => this.store.setItem('movies', res.id, res))
    );
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.api}/movies/${id}`).pipe(
      tap((res: Movie) => this.store.removeItem('movies', id)),
      exhaustMap((res: Movie) => {
        const isFav = this.store.get('favorites', id + '');
        if (isFav) { return this.removeFavorite(id); }
        return of(res);
      })
    );
  }

  addFavorite(id: number): Observable<any> {
    return this.http.post(`${this.api}/favorites`, { id }).pipe(
      tap(() => this.store.setItem('favorites', id, { id }))
    );
  }

  removeFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.api}/favorites/${id}`).pipe(
      tap(() => this.store.removeItem('favorites', id))
    );
  }

}
