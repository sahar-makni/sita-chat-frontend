import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PATHS} from './utils/const/paths';
import {SignInComponent} from './sign-in/sign-in.component';
import {ChatComponent} from './chat/chat.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {AuthGuard} from './utils/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {path: PATHS.CHAT.VALUE, component: ChatComponent}
    ]
  },
  {
    path: PATHS.SIGN_IN.VALUE,
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
