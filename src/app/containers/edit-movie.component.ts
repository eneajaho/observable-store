import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { AppService } from '../services/app.service';
import { take, pluck, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'edit-movie',
    template: `
        <div class="row my-4">
            <div class="col-9">
                <div class="mb-3">
                    <button class="btn btn-light" routerLink="/movies">Go back</button>
                </div>
                <h3 class="mb-4">Edit movie</h3>
                <app-movie-form [movie]="movie$ | async" (submitted)="editMovie($event)"></app-movie-form>
            </div>
        </div>
    `
})

export class EditMovieComponent implements OnInit {
    
    movie$: Observable<Movie>;
    movieId: number;

    constructor(
        private appService: AppService, 
        private router: Router, 
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.movie$ = this.route.data.pipe(
          pluck('movie'),
          tap(movie => this.movieId = movie.id)
      );
    }

    editMovie(movie: Movie) {
        const payload = { ...movie, id: this.movieId };

        this.appService.editMovie(payload).pipe(take(1)).subscribe(res => {
            this.router.navigate(['movies', res.id])
        });
    }
}