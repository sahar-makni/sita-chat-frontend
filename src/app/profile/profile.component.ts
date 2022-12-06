import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ThemeOption, ThemeService} from '../common/theme.service';



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

  constructor(private readonly translateService: TranslateService,
              private readonly themeService: ThemeService,
              ) {
  }

  ngOnInit(): void {
  }

  handleSelectedTheme(newTheme: ThemeOption): void {
    this.selectedTheme = newTheme;
    this.themeService.switchTheme(newTheme);
  }
}
