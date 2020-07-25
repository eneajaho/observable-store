import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../store';
import { Subscription } from 'rxjs';
import { Auth } from '../models';

@Component({
  selector: 'app-protected',
  template: `
    <div class="alert alert-info mt-4">
      <h3 class="text-center font-weight-normal">This route can be accessed only if you are logged in!</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProtectedComponent implements OnDestroy {

  private sub: Subscription;

  constructor(private store: Store, private router: Router) {
    this.sub = this.store.select<Auth>('auth').subscribe(auth => {
      if (!auth?.token) {
        this.router.navigate([ '/' ]);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
