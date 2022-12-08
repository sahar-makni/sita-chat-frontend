import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WEB_LOCAL_STORAGE} from '../utils/providers/web-storage.provider';
import {USER_THEME} from '../utils/const/general';

export type ThemeOption = 'ARYA_BLUE' | 'SAGA_BLUE';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  THEME_MAP = {
    ARYA_BLUE: 'arya-blue',
    SAGA_BLUE: 'saga-blue',
  };

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(WEB_LOCAL_STORAGE) private readonly localStorage: Storage,
  ) {
    this.switchTheme(this.getTheme());
  }


  switchTheme(theme: ThemeOption | undefined): void {
    if (!theme) {
      return;
    }
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this.THEME_MAP[theme] + '.css';
      // update storage
      this.localStorage.setItem(USER_THEME, theme);
    }
  }

  getTheme(): ThemeOption {
    return this.localStorage.getItem(USER_THEME) as ThemeOption;
  }
}
