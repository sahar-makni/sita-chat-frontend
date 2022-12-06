import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PATHS} from './utils/const/paths';
import {SignInComponent} from './sign-in/sign-in.component';
import {ChatComponent} from './chat/chat.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {AuthGuard} from './utils/guard/auth-guard';
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {path: PATHS.CHAT.VALUE, component: ChatComponent},
      {path: PATHS.PROFILE.VALUE, component: ProfileComponent},
    ]
  },
  {
    path: PATHS.SIGN_IN.VALUE,
    canActivate: [ /* TODO: add login guard here (redirect to home if already signed in) */ ],
    component: SignInComponent,
    data: {
      title: PATHS.SIGN_IN.TITLE,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
