import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng-lts/api';
import {Router} from '@angular/router';
import {PATHS} from '../utils/const/paths';
import {UserService} from '../common/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor(private readonly router: Router, private readonly userService: UserService) {
  }

  ngOnInit(): void {
    // TODO: labels should be translated
    this.items = [
      {
        label: 'Account',
        items: [{
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.router.navigate([PATHS.PROFILE.VALUE]).then();
          }
        }, {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.userService.signOut();
          }
        }
        ]
      }
    ];
  }

  redirectToChat(): void {
    this.router.navigate([PATHS.CHAT.VALUE]).then();
  }
}
