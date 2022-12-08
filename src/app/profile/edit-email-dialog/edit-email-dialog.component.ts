import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
  styleUrls: ['./edit-email-dialog.component.scss']
})
export class EditEmailDialogComponent implements OnInit {
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

  ngOnInit(): void {
  }

  cancelEditEmail(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
