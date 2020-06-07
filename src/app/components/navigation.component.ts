import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { Auth } from '../models';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar bg-primary navbar-dark navbar-expand-md fixed-top py-xs-3 px-3"
         [ngClass]="scrolled ? 'shadow py-2' : 'py-3'">
      <a (click)="hide()" class="navbar-brand" routerLink="/">My Movies</a>
      <button (click)="show()" class="navbar-toggler" type="button">
        <span *ngIf="!showMenu" class="navbar-toggler-icon"></span>
        <span *ngIf="showMenu" class="close">&times;</span>
      </button>
      <div class="collapse navbar-collapse" [class.show]="showMenu">
        <ul class="navbar-nav">
          <li (click)="hide()" class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/movies">Movies</a>
          </li>
          <li (click)="hide()" class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/new">Add Movie</a>
          </li>
        </ul>
        <ul class="ml-auto navbar-nav">
          <li class="nav-item active mr-4" *ngIf="favoritesCount">
            <a class="nav-link">Favorites
              <span class="badge badge-light">{{ favoritesCount }}</span>
            </a>
          </li>
          <li class="nav-item active" *ngIf="auth">
            <a class="nav-link" routerLink="/">{{ auth.user }}</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [ `
    nav {
      transition: 0.3s all;
    }

    .navbar-toggler {
      border: none;
      background: none;
      outline: none;
    }

    .close {
      font-size: 31px;
      font-weight: 600;
    }
  ` ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() auth: Auth;
  @Input() favoritesCount: number | null;

  showMenu = false;
  scrolled = false;

  show() {
    this.showMenu = !this.showMenu;
  }

  hide() {
    this.showMenu = false;
  }

  @HostListener('window:scroll', [ '$event' ])
  onWindowScroll(e) {
    this.scrolled = window.pageYOffset > 50;
  }
}
