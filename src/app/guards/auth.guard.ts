import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '../store';
import { Auth } from '../models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select<Auth>('auth').pipe(
      map((auth: Auth) => {
        if (auth?.token) { return true; }
        this.router.navigate([ '/' ]).then(() => {
          console.warn(`You cannot access this route: "${state.url}".`);
        });
        return false;
      })
    );
  }

}
