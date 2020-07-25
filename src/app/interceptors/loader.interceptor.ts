import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    this.loaderService.start();
    return next.handle(request).pipe(
      finalize(() => this.loaderService.stop())
    );
  }
}

export const LoaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoaderInterceptor,
  multi: true
};
