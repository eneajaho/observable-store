import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from '../models';

@Component({
  selector: 'app-movie',
  template: `
    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-between mb-4">
        <button class="btn btn-light" routerLink="/movies">Go back</button>
        <button class="btn btn-primary" [routerLink]="['/edit/', movie.id]">Edit Movie</button>
      </div>
      <div class="col-12 col-md-3">
        <img [src]="movie.image" class="w-100 h-auto img-thumbnail rounded mb-4">
      </div>
      <div class="col-12 col-md-9">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(({ data }) => this.movie = data);
  }

}
