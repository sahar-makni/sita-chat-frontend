import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ACCESS_TOKEN} from '../const/general';
import {WEB_LOCAL_STORAGE} from '../providers/web-storage.provider';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(WEB_LOCAL_STORAGE) private readonly localStorage: Storage
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the access token from storage
    const accessToken = this.localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      // Clone the request and add the access token to the headers
      const authReq = req.clone({
        headers: req.headers.set(ACCESS_TOKEN, accessToken)
      });

      // Pass the cloned request to the next interceptor in the chain
      return next.handle(authReq);
    }
    // no access token for sign in
    return next.handle(req);
  }
}
