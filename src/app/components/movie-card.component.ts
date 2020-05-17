import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movie-card',
  template: `
    <div class="card shadow border-0">
      <img [src]="movie.image" [routerLink]="['/movies/', movie.id]" class="card-img-top cp" [alt]="movie.title">
      <div class="card-body">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
        <button *ngIf="!movie.isFavorite" class="btn btn-primary" (click)="add()">
          Add to favorites
        </button>
        <button *ngIf="movie.isFavorite" class="btn btn-danger" (click)="remove()">
          Remove from favorites
        </button>
      </div>
    </div>
  `,
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
