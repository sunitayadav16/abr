import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseModel } from '../models';
import { AuthService, ToasterService } from '../services';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private toasterService: ToasterService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => this.handleResponse(event))
        );
    }

   
    private handleResponse(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
          const { data, message } = (event.body || {}) as BaseResponseModel;
          event = event.clone({ body: data });
          
          // Show success messages from api
          if (message) this.toasterService.success(message);
        }
        return event;
    }
}
