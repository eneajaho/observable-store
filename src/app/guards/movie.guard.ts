import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppService } from '../services';
import { State, Store } from '../store';
import { Movie } from '../models';

@Injectable({ providedIn: 'root' })
export class MovieGuard implements CanActivate {

  constructor(private store: Store, private appService: AppService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {

    this.store.query<Movie[]>((state) => state.movies).subscribe(data => {
      console.log(data);
    });

    const movies = this.store.get('movies');
    if (!movies || movies.length === 0 || movies.length === 1) {
      this.appService.getMovies().pipe(take(1)).subscribe();
    }
    return true;
  }

}
