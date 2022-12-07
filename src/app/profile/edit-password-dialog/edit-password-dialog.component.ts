import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../utils/form/validator/confirmation.validator';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.scss']
})
export class EditPasswordDialogComponent implements OnInit {
  @Input() visible: boolean;
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

  ngOnInit(): void {
  }

  cancelEditPassword(): void {
    this.form.reset();
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
