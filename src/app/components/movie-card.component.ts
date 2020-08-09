import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models';

@Component({
  selector: 'app-movie-card',
  template: `
    <div class="card shadow rounded">
      <img [src]="movie.image" (click)="seeMore()" class="card-img-top cp" [alt]="movie.title">

      <div class="card-body">
        <div class="d-flex justify-content-between">
          <span class="h3">{{ movie.title }}</span>
        </div>
        <p class="description">{{ movie.description | truncate: 80 }}..</p>
      </div>
      <span *ngIf="showAdd && !this.isPreview" class="star" (click)="add()">
        <svg class="star-icon">
          <use xlink:href="assets/svg/star.svg#Capa_1" style="fill: white;"></use>
        </svg>
      </span>
      <span *ngIf="!showAdd && !this.isPreview" class="star" (click)="remove()">
        <svg class="star-icon">
          <use xlink:href="assets/svg/star-filled.svg#Capa_1"></use>
        </svg>
      </span>
    </div>
  `,
  styles: [ `
    .card {
      border: none !important;
      overflow: hidden;
      position: relative;
    }

    .card-body {
      position: absolute;
      bottom: 0;
      color: white;
      width: 100%;
      background: linear-gradient(180deg, #00000014 -10%, rgb(0, 0, 0) 100%);
      z-index: 2;
    }

    .description {
      font-size: 13px;
      color: #dedcdc;
      font-weight: 500;
      margin-bottom: 0;
    }

    img {
      transition: 0.5s all;
    }

    .star {
      position: absolute;
      top: -55px;
      right: -45px;
      filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 8));
      background: #00000061;
      padding: 65px 25px 5px 28px;
      transform: rotate(45deg);
      cursor: pointer;
    }

    .star-icon {
      width: 23px;
      height: 23px;
      transform: rotateZ(29deg);
    }

    .card:hover img {
      transform: scale(1.05);
    }
  ` ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {

  @Input() movie: Movie;
  @Input() isPreview: boolean;

  @Output() added = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();

  constructor(private router: Router) {}

  add() {
    this.added.emit(this.movie.id);
  }

  remove() {
    this.removed.emit(this.movie.id);
  }

  seeMore() {
    if (this.isPreview) { return; }
    this.router.navigate([ '/movies/', this.movie.id ]);
  }

  get showAdd(): boolean {
    return !this.movie.isFavorite;
  }

}
