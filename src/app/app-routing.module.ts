import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PATHS} from './utils/const/paths';
import {SignInComponent} from './sign-in/sign-in.component';
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: PATHS.SIGN_IN.VALUE,
    pathMatch: 'full',
  },
  {
    path: PATHS.SIGN_IN.VALUE,
    component: SignInComponent,
    data: {
      title: PATHS.SIGN_IN.TITLE,
    }
  },
  {
    path: PATHS.CHAT.VALUE,
    component: ChatComponent,
    data: {
      title: PATHS.CHAT.TITLE,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
