import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent, FavoritesComponent, MovieCardComponent, MovieFormComponent } from './components';
import { MovieComponent, NewMovieComponent, EditMovieComponent, AllMoviesComponent } from './containers';
import { MovieGuard, FavoriteGuard } from './guards';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MovieResolver } from './resolvers/MovieResolver';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';

const routes: Route[] = [
  {
    path: '', component: AppComponent, children: [
      {
        path: '', redirectTo: 'movies', pathMatch: 'full'
      },
      {
        path: 'movies',
        canActivate: [ MovieGuard, FavoriteGuard ],
        component: AllMoviesComponent
      },
      {
        path: 'movies/:id',
        component: MovieComponent,
        canActivate: [ MovieGuard ],
        resolve: { data: MovieResolver }
      },
      {
        path: 'new',
        component: NewMovieComponent
      },
      {
        path: 'edit/:id',
        component: EditMovieComponent,
        canActivate: [ MovieGuard ],
        resolve: { movie: MovieResolver }
      }
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MovieCardComponent,
    MovieFormComponent,
    AllMoviesComponent,
    NewMovieComponent,
    EditMovieComponent,
    MovieComponent,
    FavoritesComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    ErrorInterceptorProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
