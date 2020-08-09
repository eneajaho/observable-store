import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '../store';
import { Auth } from '../models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {

    constructor(private store: Store, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.select<Auth>('auth').pipe(
            map(auth => {
                // if user is not authenticated he can access the route
                if (!auth?.token) { return true; }
                console.log('💀 You cannot access this route!');
                this.router.navigate(['/']);
                return false;
            })
        );
    }

}