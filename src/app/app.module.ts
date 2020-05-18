import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation.component';
import { MovieCardComponent } from './components/movie-card.component';
import { AllMoviesComponent } from './containers/all-movies.component';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MovieComponent } from './containers/movie.component';
import { MovieResolver } from './resolvers/MovieResolver';
import { MovieGuard } from './guards/movie.guard';
import { FavoritesComponent } from './components/favorites.component';

const routes: Route[] = [
  {
    path: '', component: AppComponent, children: [
      {
        path: '', redirectTo: 'movies', pathMatch: 'full'
      },
      {
        path: 'movies',
        canActivate: [MovieGuard],
        component: AllMoviesComponent
      },
      {
        path: 'movies/:id',
        component: MovieComponent,
        canActivate: [MovieGuard],
        resolve: { data: MovieResolver }
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MovieCardComponent,
    AllMoviesComponent,
    TruncatePipe,
    MovieComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
