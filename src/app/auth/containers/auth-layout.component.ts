import { Component } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    template: `
        <div class="container">
            <div class="position-absolute" style="top: 10px">
                <button routerLink="/" class="btn btn-light">Go back</button>
            </div>
            <div class="row justify-content-center align-items-center min-vh-100">
                <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `
})
export class AuthLayoutComponent { }
