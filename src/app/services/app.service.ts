import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { Auth } from '../models/Auth';
import { tap } from 'rxjs/operators';
import { Store } from '../store/Store';

@Injectable({ providedIn: 'root' })
export class AppService {

  private readonly api = 'http://localhost:3000';

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

  getUser(): Observable<Auth> {
    return this.http.get<Auth>(`${this.api}/auth`).pipe(
      tap(res => this.store.set('auth', res))
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
      tap((res: Movie) => this.store.removeItem('movies', id))
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
