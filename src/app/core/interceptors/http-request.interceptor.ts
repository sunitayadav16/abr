import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Messages } from '../config';
import { AuthService, LoaderService, ToasterService } from '../services';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService,
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const formDataRequest = request.body instanceof FormData;
        if (request.method == "POST" && !formDataRequest) {
            request = request.clone({
                setHeaders: {
                    "Content-Type": "application/json"
                }
            });
        }

        // Add authorization header with jwt token
        const isLoggedIn = this.authService.isAuthenticated();
        if (isLoggedIn) {
            request = this.addTokenHeader(request);
        }

        return next.handle(request).pipe(
            catchError((x) => this.handleAuthError(request, next, x))
        );
    }

    private handleAuthError(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (error.status === 401) {
            return this.handle401Error(req, next);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            // return of(err.message); // or EMPTY may be appropriate here
        }

        // Show error message from api
        const errorMessage = error.error.message || Messages.Error.UnexptectedError;
        this.toasterService.error(errorMessage);

        return throwError(error);
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.authService.storeAuthToken(token.accessToken);
                    this.refreshTokenSubject.next(token.accessToken);

                    return next.handle(this.addTokenHeader(request));
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    this.authService.clearStorage();
                    this.router.navigate(['']);
                    // this.authService.logout();
                    this.loaderService.hideSpinner();
                    return throwError(err);
                })
            );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>) {
        const token = this.authService.getAuthToken();
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
