import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(private auth: AuthService) {
    this.auth.getUser().pipe(take(1)).subscribe();
  }

}
