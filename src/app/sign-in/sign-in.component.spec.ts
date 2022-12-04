import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInComponent} from './sign-in.component';

import {Pipe, PipeTransform} from '@angular/core';


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
      declarations: [SignInComponent, TranslationPipeMock]
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
