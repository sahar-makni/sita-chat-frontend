import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ThemeOption, ThemeService} from '../common/theme.service';

export type Languages = 'EN' | 'FR';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  themes: { label: string, value: string }[];
  languages: { label: string, value: string }[];
  selectedTheme: ThemeOption = 'DARK';
  selectedLanguage: Languages = 'EN';

  constructor(private readonly translateService: TranslateService,
              private readonly themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.setUpOptions();
  }

  setUpOptions(): void {
    this.themes = [
      {label: this.translateService.instant('profile.theme.dark'), value: 'DARK'},
      {label: this.translateService.instant('profile.theme.light'), value: 'LIGHT'}
    ];
    this.languages = [
      {label: this.translateService.instant('profile.language.en'), value: 'EN'},
      {label: this.translateService.instant('profile.language.fr'), value: 'FR'}
    ];
  }

  handleSelectedTheme(theme: ThemeOption): void {
    this.selectedTheme = theme;
    this.themeService.switchTheme(theme);
  }

  handleSelectedLanguage(language: Languages): void {
    console.log(language);
    this.selectedLanguage = language;
    this.translateService.use(language.toLowerCase());
  }
}
