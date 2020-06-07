import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppService } from '../services';
import { Store } from '../store';

@Injectable({ providedIn: 'root' })
export class FavoriteGuard implements CanActivate {

  constructor(private store: Store, private appService: AppService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const favorites = this.store.get('favorites');
    if (!favorites || favorites.length === 0) {
      this.appService.getFavorites().pipe(take(1)).subscribe();
    }
    return true;
  }

}
