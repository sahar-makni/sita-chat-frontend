import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utils/form/validator/confirmation.validator';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
})
export class EditPasswordDialogComponent {
  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    if (!value) {
      this.form.reset();
    }
    this._visible = value;
  }

  // tslint:disable-next-line:variable-name
  private _visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitPassword = new EventEmitter<{ oldPassword: string, newPassword: string }>();
  form: FormGroup = this.fb.group({
    oldPassword: this.fb.control('', [Validators.required]),
    newPassword: this.fb.control('', [Validators.required]),
    newPasswordConfirmation: this.fb.control('', [Validators.required]),
  }, {validators: [CustomValidators.MatchValidator('newPassword', 'newPasswordConfirmation')]});

  constructor(
    private readonly fb: FormBuilder,
  ) {
  }

  cancelEditPassword(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
