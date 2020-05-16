import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-card',
  template: `
    <div class="card">
      <img [src]="movie.image" class="card-img-top" [alt]="movie.title">
      <div class="card-body">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
        <button *ngIf="!movie.isFavorite" class="btn btn-primary" (click)="add()">
          Add to favorites
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

}
