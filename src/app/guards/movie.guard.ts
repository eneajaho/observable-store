import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '../store/Store';
import { AppService } from '../services/app.service';
import { map, take, tap } from 'rxjs/operators';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MovieGuard implements CanActivate {

  constructor(private store: Store, private appService: AppService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const movies = this.store.get('movies');
    if (!movies || movies.length === 0) {
      this.appService.getMovies().pipe(take(1)).subscribe();
    }
    return true;
  }

}
