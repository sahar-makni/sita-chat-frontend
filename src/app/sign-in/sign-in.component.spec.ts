import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';

import {Pipe, PipeTransform} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../common/user.service';


@Pipe({name: 'translate'})
class TranslationPipeMock implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value;
  }
}

describe(SignInComponent.name, () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent, TranslationPipeMock],
      imports: [ RouterTestingModule],
      providers: [{provide: TranslateService , useValue: {}}, FormBuilder,
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
});
