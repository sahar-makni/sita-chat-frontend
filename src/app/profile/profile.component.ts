import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

export type ThemeOption = 'DARK' | 'THEME';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  themes = [
    {label: this.translateService.instant('profile.theme.dark'), value: 'DARK'},
    {label: this.translateService.instant('profile.theme.light'), value: 'LIGHT'}
  ];

  selectedTheme: ThemeOption = 'DARK';

  constructor(private readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

}
