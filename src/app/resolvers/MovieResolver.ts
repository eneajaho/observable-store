import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Movie } from '../models';
import { Store } from '../store';

@Injectable({ providedIn: 'root' })
export class MovieResolver implements Resolve<Movie> {

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const movieId = route.paramMap.get('id');
    return this.store.select('movies', movieId).pipe(take(1));
  }

}
