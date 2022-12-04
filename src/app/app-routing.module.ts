import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PATHS} from './utils/const/paths';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: PATHS.SIGN_IN.VALUE,
    component: SignInComponent,
    data: {
      title: PATHS.SIGN_IN.TITLE,
    }
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
