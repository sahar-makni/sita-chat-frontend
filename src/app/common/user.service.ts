import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInRequest, SignInResponse, SignInSuccessResponse, UserResponse} from './user.type';
import {environment} from '../../environments/environment';
import {forkJoin, Observable, of} from 'rxjs';
import {WEB_LOCAL_STORAGE} from '../utils/providers/web-storage.provider';
import {delay, map, switchMap, tap} from 'rxjs/operators';
import {ACCESS_TOKEN, USER_LANGUAGE, USER_WS_PATH} from '../utils/const/general';
import {Router} from '@angular/router';
import {PATHS} from '../utils/const/paths';
import {ThemeService} from './theme.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private readonly httpClient: HttpClient,
              @Inject(WEB_LOCAL_STORAGE) private readonly localStorage: Storage,
              private readonly router: Router,
              private readonly themeService: ThemeService,
              private readonly translateService: TranslateService,
  ) {
  }


  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${environment.baseUrl}/signin`, signInRequest)
      .pipe(
        tap((signInSuccessResponse: SignInSuccessResponse) =>
          this.localStorage.setItem(ACCESS_TOKEN, signInSuccessResponse.accessToken)),
        switchMap((signInSuccessResponse: SignInSuccessResponse) => {
          return forkJoin([of(signInSuccessResponse), this.getUser(signInSuccessResponse.accessToken)]);
        }),
        tap(([signInSuccessResponse, userResponse]: [SignInSuccessResponse, UserResponse]) => {
          this.setUserPreferences(userResponse);
        }),
        delay(10),
        map(([signInSuccessResponse, userResponse]: [SignInSuccessResponse, UserResponse]) => {
          return signInSuccessResponse;
        }));
  }

  getUser(accessToken: string): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${environment.baseUrl}${USER_WS_PATH}/${accessToken}`);
  }

  signOut(): void {
    // remove access token from storage
    this.localStorage.removeItem(ACCESS_TOKEN);
    // set theme to default (saga-blue)
    this.themeService.switchTheme('SAGA_BLUE');
    // redirect to login page
    // we need a little wait here, so that the theme is well modified
    setTimeout(() => {
      this.router.navigate([PATHS.SIGN_IN.VALUE]).then();
    }, 10);
  }

  updateEmail(email: string): Observable<boolean> {
    // return throwError(new Error('Failed to update email'));
    return of(true);
  }

  private setUserPreferences(userResponse: UserResponse): void {
    this.localStorage.setItem(USER_LANGUAGE, userResponse.language);
    this.themeService.switchTheme(userResponse.theme);
    this.translateService.use(userResponse.language.toLowerCase());
  }
}
