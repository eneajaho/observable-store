import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { AppService } from '../services/app.service';
import { take, pluck, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'edit-movie',
    template: `
        <div class="row justify-content-between my-4">
            <div class="col-12 col-md-7 mb-4 mb-md-0">
                <div class="d-flex justify-content-between mb-3">
                    <button class="btn btn-light" routerLink="/movies">Go back</button>
                    <button class="btn btn-danger" (click)="delete()">Delete Movie</button>
                </div>
                <h3 class="mb-4">Edit movie</h3>
                <app-movie-form 
                    [movie]="movie$ | async" 
                    (submitted)="editMovie($event)"
                    (preview)="handlePreview($event)">
                </app-movie-form>
            </div>
            <div class="col-12 col-md-4">
                <app-movie-card isPreview="true" [movie]="preview$ | async"></app-movie-card>
            </div>
        </div>
    `
})

export class EditMovieComponent implements OnInit {
    
    movie$: Observable<Movie>;
    preview$: Observable<Movie>;
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
      this.preview$ = this.movie$;
    }

    editMovie(movie: Movie) {
        const payload = { ...movie, id: this.movieId };

        this.appService.editMovie(payload).pipe(take(1)).subscribe(res => {
            this.router.navigate(['movies', res.id])
        });
    }

    handlePreview(movie: Movie) {
        this.preview$ = of(movie);
    }

    delete() {
        this.appService.deleteMovie(this.movieId).pipe(take(1)).subscribe();
        this.router.navigate(['/movies'])
    }
}