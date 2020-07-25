import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '../store';
import { Auth } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const auth = this.store.get<Auth>('auth');
    if (auth?.token) {
      return true;
    }
    console.log('You cannot access this route!');
    this.router.navigate([ '/' ]);
  }

}
