import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInRequest, SignInResponse} from './sign-in.type';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SignInService {
  constructor(private httpClient: HttpClient) {
  }


  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${environment.baseUrl}/signin`, signInRequest);
  }

}
