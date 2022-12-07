import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
  styleUrls: ['./edit-email-dialog.component.scss']
})
export class EditEmailDialogComponent implements OnInit {

  @Input() visible: boolean;
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
    this.emailInput.reset('');
    this.showEditEmailDialog = false;
  }
}
