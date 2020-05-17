import { Component, OnInit } from '@angular/core';
import { Store } from './store/Store';
import { AppService } from './services/app.service';
import { Observable } from 'rxjs';
import { Auth } from './models/Auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation [auth]="auth$ | async"></app-navigation>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {

  auth$: Observable<Auth>;

  constructor(private store: Store, private appService: AppService) {}

  ngOnInit(): void {
    this.auth$ = this.store.select<Auth>('auth');
    this.appService.getUser().pipe(take(1)).subscribe();
  }
}
