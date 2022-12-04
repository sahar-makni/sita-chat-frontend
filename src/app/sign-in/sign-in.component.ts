import {Component, OnInit} from '@angular/core';
import {PATHS} from '../utils/const/paths';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  value1: string;

  constructor(public title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle(PATHS.SIGN_IN.TITLE);
  }

}
