import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInRequest, SignInResponse, SignInSuccessResponse} from './sign-in.type';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {WEB_LOCAL_STORAGE} from '../utils/providers/web-storage.provider';
import {tap} from 'rxjs/operators';
import {ACCESS_TOKEN} from "../utils/const/general";

@Injectable({providedIn: 'root'})
export class SignInService {
  constructor(private httpClient: HttpClient,
              @Inject(WEB_LOCAL_STORAGE) private readonly localStorage: Storage,
  ) {
  }


  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${environment.baseUrl}/signin`, signInRequest)
      .pipe(tap((signInSuccessResponse: SignInSuccessResponse) =>
        this.localStorage.setItem(ACCESS_TOKEN, signInSuccessResponse.accessToken)))
      ;
  }

}
