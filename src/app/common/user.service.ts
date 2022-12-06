import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInRequest, SignInResponse, SignInSuccessResponse} from './user.type';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {WEB_LOCAL_STORAGE} from '../utils/providers/web-storage.provider';
import {tap} from 'rxjs/operators';
import {ACCESS_TOKEN} from '../utils/const/general';
import {Router} from '@angular/router';
import {PATHS} from '../utils/const/paths';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private readonly httpClient: HttpClient,
              @Inject(WEB_LOCAL_STORAGE) private readonly localStorage: Storage,
              private readonly router: Router,
  ) {
  }


  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${environment.baseUrl}/signin`, signInRequest)
      .pipe(tap((signInSuccessResponse: SignInSuccessResponse) =>
        this.localStorage.setItem(ACCESS_TOKEN, signInSuccessResponse.accessToken)));
  }

  signOut(): void {
    this.localStorage.removeItem(ACCESS_TOKEN);
    this.router.navigate([PATHS.SIGN_IN.VALUE]).then();
  }

}
