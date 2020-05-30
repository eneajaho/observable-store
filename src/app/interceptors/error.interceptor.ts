import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError(error => {

        if (error.status === 0) {
          if (error?.statusText === 'Unknown Error') {
            return throwError('Server is not responding!');
          }
          return throwError(error.statusText);
        }

        if (error.status === 401) {
          if (error.statusText === 'Unauthorized') {
            return throwError('You are not authorized!');
          }
          return throwError(error.statusText);
        }

        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }

          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateErrors += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
