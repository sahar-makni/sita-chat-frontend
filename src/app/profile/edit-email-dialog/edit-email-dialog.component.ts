import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
})
export class EditEmailDialogComponent {
  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    if (value === false) { // dialog is hidden
      this.emailInput.reset();
    }
    this._visible = value;
  }

  // tslint:disable-next-line:variable-name workaround to allow underscore
  private _visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submitEmail = new EventEmitter<string>();
  emailInput: FormControl = this.fb.control('', [Validators.required, Validators.email]);

  constructor(
    private readonly fb: FormBuilder,
  ) {
  }


  cancelEditEmail(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
