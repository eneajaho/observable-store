import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movie-card',
  template: `
    <div class="card shadow border-0">
      <img [src]="movie.image" [routerLink]="['/movies/', movie.id]"
           class="card-img-top cp" [alt]="movie.title">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <span class="h3">{{ movie.title }}</span>  
          <a [routerLink]="['/edit', movie.id]">Edit</a>  
        </div>
        <p>{{ movie.description | truncate: 80 }}..</p>
        <button *ngIf="!movie.isFavorite" class="btn btn-primary" (click)="add()">
          Add to favorites
        </button>
        <button *ngIf="movie.isFavorite" class="btn btn-danger" (click)="remove()">
          Remove from favorites
        </button>
      </div>
    </div>
  `,
  styles: [ `
    .card-body {
      position: absolute;
      bottom: 0;
      background: #ffffff;
      width: 100%;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {

  @Input() movie: Movie;

  @Output() added = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();

  add() {
    this.added.emit(this.movie.id);
  }

  remove() {
    this.removed.emit(this.movie.id);
  }
}
