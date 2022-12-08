import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ChangePasswordRequest, ChangePasswordResponse,
  PartialPatchUserBody,
  SignInRequest,
  SignInResponse,
  SignInSuccessResponse,
  UserResponse
} from './user.type';
import {environment} from '../../environments/environment';
import {forkJoin, Observable, of} from 'rxjs';
import {WEB_LOCAL_STORAGE} from '../utils/providers/web-storage.provider';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {
  ACCESS_TOKEN,
  USER_ID,
  USER_INFO,
  USER_LANGUAGE,
  USER_THEME,
  USER_WS_PATH,
  USER_WS_PATH_CHANGE_PASSWORD
} from '../utils/const/general';
import {Router} from '@angular/router';
import {PATHS} from '../utils/const/paths';
import {ThemeService} from './theme.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class UserService {
  get user(): UserResponse | undefined {
    return this._user || JSON.parse(this.localStorage.getItem(USER_INFO));
  }

  set user(value: UserResponse | undefined) {
    this._user = value;
    this.localStorage.setItem(USER_INFO, JSON.stringify(value));
  }

  // this is a workaround to allow variables starting with underscore on the IDE
  // tslint:disable-next-line:variable-name
  _user?: UserResponse;

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
          this.localStorage.setItem(USER_ID, signInSuccessResponse.accessToken);
          this.setUserPreferences(userResponse);
        }),
        delay(10),
        map(([signInSuccessResponse]: [SignInSuccessResponse, UserResponse]) => {
          return signInSuccessResponse;
        }));
  }

  getUser(accessToken: string): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${environment.baseUrl}${USER_WS_PATH}/${accessToken}`).pipe(

    );
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
    return this.patchUser(this.getUserId(), {email}).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private setUserPreferences(userResponse: UserResponse): void {
    this.localStorage.setItem(USER_LANGUAGE, userResponse.language);
    this.themeService.switchTheme(userResponse.theme);
    this.translateService.use(userResponse.language);
    this.user = userResponse;
  }

  patchUser(userId: number, body: PartialPatchUserBody): Observable<UserResponse> {
    return this.httpClient.patch<UserResponse>(`${environment.baseUrl}${USER_WS_PATH}/${userId}`, body).pipe(
      tap((userResponse: UserResponse) => {
        this.localStorage.setItem(USER_ID, String(userResponse.id));
        this.localStorage.setItem(USER_LANGUAGE, userResponse.language);
        this.localStorage.setItem(USER_THEME, userResponse.theme);
        this.user = userResponse;
      })
    );
  }

  getUserId(): number {
    return Number(this.localStorage.getItem(USER_ID));
  }

  updatePassword(changePasswordRequest: ChangePasswordRequest): Observable<boolean> {
    const url = `${environment.baseUrl}${USER_WS_PATH}/${this.getUserId()}${USER_WS_PATH_CHANGE_PASSWORD}`;
    return this.httpClient.post<ChangePasswordResponse>(url, changePasswordRequest)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}
