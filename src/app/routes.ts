import { Route } from '@angular/router';
import {
  AllMoviesComponent,
  EditMovieComponent,
  LayoutComponent,
  MovieComponent,
  NewMovieComponent,
  ProtectedComponent
} from './containers';
import { AuthGuard, FavoriteGuard, MovieGuard } from './guards';
import { MovieResolver } from './resolvers/MovieResolver';

export const routes: Route[] = [
  {
    path: '', redirectTo: 'movies', pathMatch: 'full'
  },
  {
    path: '', component: LayoutComponent, children: [
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
        component: NewMovieComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'edit/:id',
        component: EditMovieComponent,
        canActivate: [ AuthGuard, MovieGuard ],
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
