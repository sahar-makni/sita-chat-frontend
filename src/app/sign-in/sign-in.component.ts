import {Component, OnInit} from '@angular/core';
import {PATHS} from '../utils/const/paths';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from './sign-in.service';
import {SignInResponse} from './sign-in.type';
import {MessageService} from 'primeng-lts/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService]
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService,
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
    this.messageService.clear();
    this.signInService.signIn(this.form.value).subscribe({
      next: (signInResponse: SignInResponse) => {
        console.log('Welcome ', signInResponse);
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('connexion.messages.signInSuccess')
        });
        // TODO : Redirect to home page.
      }, error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('connexion.errors.signInError')
        });
      }
    });
  }
}
