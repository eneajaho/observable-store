import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Movie } from '../models/Movie';
import { Store } from '../store/Store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppService } from '../services/app.service';

@Injectable({ providedIn: 'root' })
export class MovieResolver implements Resolve<Movie> {

  constructor(private store: Store, private service: AppService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.store.select('movies', route.paramMap.get('id')).pipe(take(1));
  }

}
