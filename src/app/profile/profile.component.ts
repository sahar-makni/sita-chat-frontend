import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ThemeOption, ThemeService} from '../common/theme.service';
import {UserService} from '../common/user.service';
import {MessageService} from 'primeng-lts/api';
import {ChangePasswordRequest} from '../common/user.type';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

export type LanguageOption = 'EN' | 'FR';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {

  themes: { label: string, value: string }[];
  languages: { label: string, value: string }[];
  selectedTheme: ThemeOption;
  selectedLanguage: LanguageOption;
  showEditEmailDialog = false;
  showEditPasswordDialog: boolean;

  get userEmail(): string {
    return this.userService.user?.email ?? '';
  }

  get userMessagesCount(): number {
    return this.userService.user?.messagesCount ?? -1;
  }

  get userRoomsCount(): number {
    return this.userService.user?.roomsCount ?? -1;
  }


  constructor(private readonly translateService: TranslateService,
              private readonly themeService: ThemeService,
              private readonly userService: UserService,
              private readonly messageService: MessageService,
              private readonly title: Title,
              private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle(this.activatedRoute.snapshot.data.title);
    this.selectedTheme = this.themeService.getTheme();
    this.translateService.onLangChange.subscribe(() => {
      this.selectedLanguage = this.userService.user.language;
    });
    this.selectedLanguage = this.userService.user.language;
    this.translateService.use(this.selectedLanguage);
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
    this.userService.patchUser(this.userService.getUserId(), {theme})
      .subscribe(_ => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('profile.theme.success'),
          });
        },
        _ => {
          this.messageService.add({severity: 'error', summary: this.translateService.instant('profile.theme.error')});
        }
      );
  }

  handleSelectedLanguage(language: LanguageOption): void {
    this.userService.patchUser(this.userService.getUserId(), {language})
      .subscribe(_ => {
          this.translateService.use(language);
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('profile.language.success'),
          });
        },
        _ => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('profile.language.error')
          });
        }
      );
  }

  editEmail(email: string): void {
    this.userService.updateEmail(email)
      .subscribe(success => {
          if (success) {
            this.showEditEmailDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('profile.email.success'),
            });
          } else {
            this.messageService.add({severity: 'error', summary: this.translateService.instant('profile.email.error')});
          }
        }
      );
  }

  updatePassword(changePasswordRequest: ChangePasswordRequest): void {
    this.userService.updatePassword(changePasswordRequest)
      .subscribe(success => {
          if (success) {
            this.showEditPasswordDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('profile.password.success'),
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('profile.password.error')
            });
          }
        },
      );
  }
}
