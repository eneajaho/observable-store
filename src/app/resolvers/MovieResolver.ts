import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Movie } from '../models/Movie';
import { Store } from '../store/Store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieResolver implements Resolve<Movie> {

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.store.select('movies', route.paramMap.get('id')).pipe(take(1));
  }

}
