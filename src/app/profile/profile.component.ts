import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ThemeOption, ThemeService} from '../common/theme.service';
import {UserService} from '../common/user.service';
import {MessageService} from 'primeng-lts/api';

export type Languages = 'EN' | 'FR';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {

  themes: { label: string, value: string }[];
  languages: { label: string, value: string }[];
  selectedTheme: ThemeOption;
  selectedLanguage: Languages = 'EN';
  showEditEmailDialog = false;
  showEditPasswordDialog: boolean;


  constructor(private readonly translateService: TranslateService,
              private readonly themeService: ThemeService,
              private readonly userService: UserService,
              private readonly messageService: MessageService,

  ) {
  }

  ngOnInit(): void {
    this.selectedTheme = this.themeService.getTheme();
    this.setUpOptions();
  }

  setUpOptions(): void {
    this.themes = [
      {label: this.translateService.instant('profile.theme.dark'), value: 'ARYA_BLUE'},
      {label: this.translateService.instant('profile.theme.light'), value: 'SAGA_BLUE'}
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

  editEmail(email: string): void {
    // todo: open popup to edit email
    this.userService.updateEmail(email)
      .subscribe(_ => {
          this.showEditEmailDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('profile.email.success'),
          });
        },
        _ => {
          this.messageService.add({severity: 'error', summary: this.translateService.instant('profile.email.error')});
        }
      );

  }

  changePassword(): void {
    // todo: open popup to change password
    console.log('change password');
  }


  updatePassword(password: { oldPassword: string; newPassword: string }): void {
    console.log('updatePassword called with', password);
  }
}
