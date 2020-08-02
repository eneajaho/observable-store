import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Store } from '../store';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly api = environment.api;

  constructor(private http: HttpClient, private store: Store, private router: Router) { }

  getUser(): Observable<Auth> {
    return this.http.get<Auth>(`${this.api}/auth`).pipe(
      tap(res => this.store.set('auth', res))
    );
  }

  logout() {
    return this.http.post(`${this.api}/auth`, {}).pipe(
      tap(() => {
        this.store.set('auth', {});
        this.router.navigate(['/']);
      })
    );
  }

  login() {
    return this.http.post(`${this.api}/auth`, { user: 'Enea', token: 'Hello World!' }).pipe(
      tap(() => this.store.set('auth', { user: 'Enea', token: 'Hello World!' }))
    );
  }
}
