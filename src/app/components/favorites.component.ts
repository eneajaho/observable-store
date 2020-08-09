import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Movie } from '../models';

@Component({
  selector: 'app-favorites',
  template: `
    <h4 class="text-center" *ngIf="movies?.length">Favorites</h4>
    <div class="mt-3 list-group shadow">
      <div *ngFor="let movie of movies; trackBy: identify"
           class="list-group-item list-group-item-action cp">
        {{ movie.title }}
        <button (click)="removeFromFavorites(movie.id)"
          class="btn btn-danger btn-sm cross">
           &times;
        </button>
      </div>
    </div>
  `,
  styles: [`
    .list-group-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: none;
      border-left: none;
      border-right: none;
      border-color: #31313112;
    }

    .list-group-item:last-child {
      border-bottom: none;
    }

    .cross {
      font-weight: 800;
      font-size: 20px;
      padding: 2px 7px 5px 7px;
      line-height: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritesComponent {

  @Input() movies: Movie[] = [];
  @Output() removed = new EventEmitter<number>();

  removeFromFavorites(id: number) {
    this.removed.emit(id);
  }

  identify(index, item) {
    return item.id;
  }
}
