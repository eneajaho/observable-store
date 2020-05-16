import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Auth } from '../../models/Auth';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar navbar-dark navbar-expand-md fixed-top bg-primary py-xs-3 px-3 shadow">
      <a class="navbar-brand" routerLink="/">My Movies</a>
      <button (click)="show()" class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" [class.show]="showMenu">
        <ul class="navbar-nav">
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/movies">Movies</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/favorites">Favorites</a>
          </li>
        </ul>
        <ul class="ml-auto navbar-nav">
          <li class="nav-item active" *ngIf="auth">
            <a class="nav-link" routerLink="/">{{ auth.user }}</a>
          </li>
        </ul>
      </div>
    </nav>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() auth: Auth;

  showMenu = false;

  show() {
    this.showMenu = !this.showMenu;
  }
}
