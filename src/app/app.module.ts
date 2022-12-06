import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng-lts/inputtext';
import {ButtonModule} from 'primeng-lts/button';
import {RippleModule} from 'primeng-lts/ripple';
import {PasswordModule} from 'primeng-lts/password';
import {WEB_LOCAL_STORAGE, WEB_SESSION_STORAGE} from './utils/web-storage.provider';
import {MessageModule} from 'primeng-lts/message';
import {MessagesModule} from 'primeng-lts/messages';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: WEB_LOCAL_STORAGE,
      useFactory: () => {
        return localStorage;
      }
    },
    {
      provide: WEB_SESSION_STORAGE,
      useFactory: () => {
        return sessionStorage;
      }
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
