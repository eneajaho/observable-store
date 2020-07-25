import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent, FavoritesComponent, MovieCardComponent, MovieFormComponent } from './components';
import {
  LayoutComponent,
  MovieComponent,
  NewMovieComponent,
  EditMovieComponent,
  AllMoviesComponent,
  ProtectedComponent
} from './containers';
import { MovieGuard, FavoriteGuard, AuthGuard } from './guards';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MovieResolver } from './resolvers/MovieResolver';
import { ErrorInterceptorProvider, LoaderInterceptorProvider } from './interceptors';

const routes: Route[] = [
  {
    path: '', component: LayoutComponent, children: [
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
      },
      {
        path: 'protected',
        component: ProtectedComponent,
        canActivate: [ AuthGuard ]
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
    LayoutComponent,
    NavigationComponent,
    MovieCardComponent,
    MovieFormComponent,
    AllMoviesComponent,
    NewMovieComponent,
    EditMovieComponent,
    FavoritesComponent,
    MovieComponent,
    ProtectedComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    ErrorInterceptorProvider,
    LoaderInterceptorProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
