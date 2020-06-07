import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '../store/Store';
import { AppService } from '../services/app.service';
import { Observable } from 'rxjs';
import { Auth } from '../models/Auth';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  template: `
    <app-navigation
      [auth]="auth$ | async"
      [favoritesCount]="favoritesCount$ | async">
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

  constructor(private store: Store, private appService: AppService) {}

  ngOnInit(): void {
    this.auth$ = this.store.select<Auth>('auth');
    this.appService.getUser().pipe(take(1)).subscribe();

    this.favoritesCount$ = this.store.select<{ id }[]>('favorites').pipe(
      map(items => items ? items.length : null)
    );
  }
}
