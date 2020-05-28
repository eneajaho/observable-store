import { Component } from '@angular/core';
import { Movie } from '../models/Movie';
import { AppService } from '../services/app.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-movie',
    template: `
        <div class="row my-4">
            <div class="col-9">
                <div class="mb-3">
                    <button class="btn btn-light" routerLink="/movies">Go back</button>
                </div>
                <h3 class="mb-4">Add new movie</h3>
                <app-movie-form (submitted)="addMovie($event)"></app-movie-form>
            </div>
        </div>
    `
})

export class NewMovieComponent {

    constructor(private appService: AppService, private router: Router) { }

    addMovie(movie: Movie) {
        this.appService.addMovie(movie).pipe(take(1)).subscribe(res => {
            this.router.navigate(['movies', res.id])
        });
    }
}