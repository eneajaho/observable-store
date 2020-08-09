import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Auth } from '../models';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar bg-primary navbar-dark navbar-expand-md fixed-top py-xs-3 px-3"
         [ngClass]="scrolled ? 'shadow py-2' : 'py-3'">
      <a (click)="hide()" class="navbar-brand d-flex align-items-center" routerLink="/">
        <svg class="movie-logo">
          <use xlink:href="assets/svg/cinema.svg#Capa_1" style="fill: white;"></use>
        </svg>
        My Movies
      </a>
      <div class="d-flex align-items-center ">
        <div *ngIf="loading" class="spinner-border spinner-border-sm d-inline-block d-sm-none text-white active mr-3"
             role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <button (click)="show()" class="navbar-toggler" type="button">
          <span *ngIf="!showMenu" class="navbar-toggler-icon"></span>
          <span *ngIf="showMenu" class="close">&times;</span>
        </button>
      </div>

      <div class="collapse navbar-collapse" [class.show]="showMenu">
        <ul class="navbar-nav">
          <li (click)="hide()" class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/movies">Movies</a>
          </li>
          <li (click)="hide()" class="nav-item" routerLinkActive="active">
            <a class="nav-link" *ngIf="auth?.token" routerLink="/new">Add Movie</a>
          </li>
          <li (click)="hide()" class="nav-item" routerLinkActive="active">
            <a class="nav-link" [class.disabled]="!auth?.token"
               routerLink="/protected">Protected Route</a>
          </li>
        </ul>
        <ul class="ml-auto navbar-nav">
          <li class="nav-item active d-flex align-items-center mr-3" *ngIf="loading">
            <div class="spinner-border spinner-border-sm text-white" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </li>
          <li class="nav-item active mr-4" *ngIf="favoritesCount">
            <a class="nav-link">Favorites
              <span class="badge badge-light">{{ favoritesCount }}</span>
            </a>
          </li>
          <ng-container *ngIf="auth?.token">
            <li class="nav-item active">
              <span class="nav-link">Hello {{ auth?.user }}</span>
            </li>
            <li class="nav-item active ml-2 d-flex align-items-center">
              <button (click)="handleLogout()" class="btn btn-sm btn-info">Logout</button>
            </li>
          </ng-container>
          <ng-container *ngIf="!auth?.token">
            <li class="nav-item d-flex align-items-center active">
              <span routerLink="/auth/login" class="px-1 cp nav-link">Login</span>
              <span routerLink="/auth/register" class="px-1 cp nav-link">Register</span>
            </li>
          </ng-container>
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

    .movie-logo {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  ` ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() auth: Auth;
  @Input() loading: boolean;
  @Input() favoritesCount: number | null;

  @Output() logout = new EventEmitter();

  showMenu = false;
  scrolled = false;

  show() {
    this.showMenu = !this.showMenu;
  }

  hide() {
    this.showMenu = false;
  }

  handleLogout() {
    this.logout.emit(true);
  }

  @HostListener('window:scroll', [ '$event' ])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 50;
  }
}
