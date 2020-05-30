import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-favorites',
  template: `
    <h4 *ngIf="movies?.length">Favorites</h4>
    <div class="list-group">
      <div *ngFor="let movie of movies" title="Remove from favorites"
           class="list-group-item list-group-item-action d-flex align-items-center justify-content-between hover cp">
        {{ movie.title }}
        <span 
          (click)="removeFromFavorites(movie.id)" 
          class="btn btn-danger btn-sm">
          Remove
        </span>
      </div>
    </div>
  `
})

export class FavoritesComponent {

  @Input() movies: Movie[] = [];
  @Output() removed = new EventEmitter<number>();

  removeFromFavorites(id: number) {
    this.removed.emit(id);
  }
}
