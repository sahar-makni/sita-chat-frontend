import {Component, OnInit} from '@angular/core';
import {PATHS} from '../utils/const/paths';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from './sign-in.service';
import {SignInRequest, SignInResponse} from './sign-in.type';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public title: Title,
    private signInService: SignInService,
  ) {
    this.setupForm();
  }

  ngOnInit(): void {
    this.title.setTitle(PATHS.SIGN_IN.TITLE);

  }

  private setupForm(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.email, Validators.required, /* TODO make sure white spaces only are not accepted*/]),
      password: this.formBuilder.control('', [Validators.required
      ]),
    });
  }

  signIn(): void {
    this.signInService.signIn(this.form.value).subscribe({
      next: (signInResponse: SignInResponse) => {
        console.log('Welcome ', signInResponse);
        // TODO : Redirect to home page.
      }, error: (error) => {
        // todo: show error message
        console.error('failed', error);
      }
    });
    console.log(this.form.value);
  }
}
