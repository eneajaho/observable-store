import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '../store';
import { AppService, LoaderService } from '../services';
import { Observable } from 'rxjs';
import { Auth } from '../models';
import { map, take } from 'rxjs/operators';

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
    <div class="container mt-5">
      <div class="row pt-4">
        <div class="col-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  auth$: Observable<Auth>;
  favoritesCount$: Observable<number>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private appService: AppService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.auth$ = this.store.select<Auth>('auth');
    this.appService.getUser().pipe(take(1)).subscribe();
    this.loading$ = this.loader.loading$;

    this.favoritesCount$ = this.store.select<{ id }[]>('favorites').pipe(
      map(items => items ? items.length : null)
    );
  }

  logout(e) {
    this.appService.logout().pipe(take(1)).subscribe();
  }

  login(e) {
    this.appService.login().pipe(take(1)).subscribe();
  }
}
