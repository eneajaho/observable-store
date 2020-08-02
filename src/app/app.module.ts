import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {
  NavigationComponent,
  FavoritesComponent,
  MovieCardComponent,
  MovieFormComponent
} from './components';
import {
  LayoutComponent,
  MovieComponent,
  NewMovieComponent,
  EditMovieComponent,
  AllMoviesComponent,
  ProtectedComponent
} from './containers';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ErrorInterceptorProvider, LoaderInterceptorProvider } from './interceptors';
import { routes } from './routes';


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
