import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../store/Store';
import { Movie } from '../models/Movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  template: `
    <div class="row">
      <div class="col-12 mb-3">
        <button class="btn btn-light" routerLink="/movies">Go back</button>
      </div>
      <div class="col-xs-12 col-md-3">
        <img [src]="movie.image" class="img-thumbnail">
      </div>
      <div class="col-xs-12 col-md-9">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
      </div>

    </div>
  `,
})
export class MovieComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  movie: Movie;

  ngOnInit(): void {
    this.route.data.pipe(take(1))
      .subscribe(({ data }) => this.movie = data);
  }

}
