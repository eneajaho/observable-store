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
        <p>{{ movie.description | truncate: 80 }}..</p>
        <button *ngIf="showAdd && !this.isPreview" class="btn btn-primary" (click)="add()">
          Add to favorites
        </button>
        <button *ngIf="!showAdd && !this.isPreview" class="btn btn-danger" (click)="remove()">
          Remove from favorites
        </button>
      </div>
    </div>
  `,
  styles: [ `
    .card {
      border: none !important;
      overflow: hidden;
    }

    .card-body {
      position: absolute;
      bottom: 0;
      color: white;
      width: 100%;
      background: linear-gradient(180deg, #00000014 -10%, rgb(0, 0, 0) 100%);
      z-index: 2;
    }

    img {
      transition: 0.5s all;
    }

    .card:hover img {
      transform: scale(1.05);
    }
  `],
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
