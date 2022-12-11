import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';

import {Pipe, PipeTransform} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../common/user.service';


@Pipe({name: 'translate'})
class TranslationPipeMock implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value;
  }
}

// these are few tests that I would have written more if I had more time

describe(SignInComponent.name, () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent, TranslationPipeMock],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        {provide: TranslateService, useValue: {}},
        FormBuilder,
        {provide: HttpClient, useValue: {}},
        {provide: UserService, useValue: {}},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show form with email and password', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs).toBeTruthy();
    expect(inputs.length).toBe(2);
    expect(inputs[0].type).toEqual('email');
    expect(inputs[1].type).toEqual('password');
  });
  describe('email', () => {
    it('should accept valid email', async () => {
      // GIVEN
      const emailInput = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
      fixture.detectChanges();
      emailInput.value = 'sahar.makni@sita.com';
      emailInput.dispatchEvent(new Event('input'));
      component.form.controls.email.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN
      const wrongFormatErrorMessage = fixture.nativeElement.querySelector('[data-test-email-format-message]') as HTMLSpanElement;
      const emptyErrorMessage = fixture.nativeElement.querySelector('[data-test-email-empty-message]') as HTMLSpanElement;
      expect(wrongFormatErrorMessage).toBeFalsy();
      expect(emptyErrorMessage).toBeFalsy();
    });
    it('should show invalid message for invalid email', async () => {
      // GIVEN
      const emailInput = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
      fixture.detectChanges();
      emailInput.value = 'not an email';
      emailInput.dispatchEvent(new Event('input'));
      component.form.controls.email.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN
      const wrongFormatErrorMessage = fixture.nativeElement.querySelector('[data-test-email-format-message]') as HTMLSpanElement;
      expect(wrongFormatErrorMessage).toBeTruthy();
      expect(wrongFormatErrorMessage.textContent).toContain('connexion.errors.invalidEmailFormat');
      const emptyErrorMessage = fixture.nativeElement.querySelector('[data-test-email-empty-message]') as HTMLSpanElement;
      expect(emptyErrorMessage).toBeFalsy();

    });
    it('should show required message for empty email', async () => {
      // GIVEN
      const emailInput = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
      fixture.detectChanges();
      emailInput.value = '';
      emailInput.dispatchEvent(new Event('input'));
      component.form.controls.email.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN
      const wrongFormatErrorMessage = fixture.nativeElement.querySelector('[data-test-email-format-message]') as HTMLSpanElement;
      expect(wrongFormatErrorMessage).toBeFalsy();
      const emptyErrorMessage = fixture.nativeElement.querySelector('[data-test-email-empty-message]') as HTMLSpanElement;
      expect(emptyErrorMessage).toBeTruthy();
      expect(emptyErrorMessage.textContent).toContain('connexion.errors.emailRequired');

    });
  });
  describe('password', () => {
    it('should accept valid password', async () => {
      // GIVEN
      const passwordInput = fixture.nativeElement.querySelector('#password') as HTMLInputElement;
      fixture.detectChanges();
      passwordInput.value = '51MP13 4ND 10N6 P455W0rD';
      passwordInput.dispatchEvent(new Event('input'));
      component.form.controls.password.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN

      const emptyErrorMessage = fixture.nativeElement.querySelector('[data-test-password-empty-message]') as HTMLSpanElement;
      expect(emptyErrorMessage).toBeFalsy();
    });
    it('should show required message for empty password', async () => {
      // GIVEN
      const passwordInput = fixture.nativeElement.querySelector('#password') as HTMLInputElement;
      fixture.detectChanges();
      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));
      component.form.controls.password.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN
      const emptyErrorMessage = fixture.nativeElement.querySelector('[data-test-password-empty-message]') as HTMLSpanElement;
      expect(emptyErrorMessage).toBeTruthy();
      expect(emptyErrorMessage.textContent).toContain('connexion.errors.passwordRequired');

    });
  });
  describe('sign in button', () => {

    it('should be disabled if form is invalid', () => {
      // GIVEN
      const emailInput = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
      const passwordInput = fixture.nativeElement.querySelector('#password') as HTMLInputElement;

      fixture.detectChanges();

      emailInput.value = 'not an email';
      passwordInput.value = '';

      emailInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      component.form.controls.email.markAsTouched();
      component.form.controls.password.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN
      const signInButton = fixture.nativeElement.querySelector('button[type=button]') as HTMLButtonElement;
      expect(signInButton).toBeTruthy();
      expect(signInButton.disabled).toBeTrue();
    });
    it('should be enabled if form is valid', () => {
      // GIVEN
      const emailInput = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
      const passwordInput = fixture.nativeElement.querySelector('#password') as HTMLInputElement;

      fixture.detectChanges();

      emailInput.value = 'email@example.com';
      passwordInput.value = 'password1!';

      emailInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      component.form.controls.email.markAsTouched();
      component.form.controls.password.markAsTouched();
      // WHEN
      fixture.detectChanges();
      // THEN
      const signInButton = fixture.nativeElement.querySelector('button[type=button]') as HTMLButtonElement;
      expect(signInButton).toBeTruthy();
      expect(signInButton.disabled).toBeFalse();
    });
  });
});
