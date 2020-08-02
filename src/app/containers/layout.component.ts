import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { LoaderService } from '../services';
import { Observable } from 'rxjs';
import { Auth } from '../models';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  template: `
    <app-navigation
      [auth]="auth$ | async"
      [favoritesCount]="favoritesCount$ | async"
      [loading]="loading$ | async"
      (logout)="logout($event)"
      (login)="login($event)"
    >
    </app-navigation>
    <div class="container min-vh-100 mt-5">
      <div class="row pt-4">
        <div class="col-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <footer class="mt-3 py-3">
      <div class="text-center">
        Made with ❤ by <a href="https://eneajaho.me" target="_blank">Enea</a>.
        <br>
        <a href="https://github.com/eneajaho/observable-store" target="_blank">View repository on Github</a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  auth$: Observable<Auth>;
  favoritesCount$: Observable<number>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private authService: AuthService,
              private loader: LoaderService) {}

  ngOnInit() {
    this.auth$ = this.store.select<Auth>('auth');
    this.loading$ = this.loader.loading$;

    this.favoritesCount$ = this.store.select<{ id }[]>('favorites').pipe(
      map(items => items ? items.length : null)
    );
  }

  logout(e) {
    this.authService.logout().pipe(take(1)).subscribe();
  }

  login(e) {
    this.authService.login().pipe(take(1)).subscribe();
  }
}


