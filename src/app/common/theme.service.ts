import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
export type ThemeOption = 'DARK' | 'LIGHT';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
THEME_MAP = {
  DARK: 'arya-blue',
  LIGHT: 'saga-blue',
};
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: ThemeOption): void {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this.THEME_MAP[theme] + '.css';
    }
  }
}
