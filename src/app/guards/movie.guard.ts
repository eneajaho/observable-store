import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppService } from '../services';
import { Store } from '../store';

@Injectable({ providedIn: 'root' })
export class MovieGuard implements CanActivate {

  constructor(private store: Store, private appService: AppService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const movies = this.store.get('movies');
    if (!movies || movies.length === 0 || movies.length === 1) {
      this.appService.getMovies().pipe(take(1)).subscribe();
    }
    return true;
  }

}
