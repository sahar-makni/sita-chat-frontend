import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng-lts/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Account',
        items: [{
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          command: () => {
            // redirect to profile
          }
        }, {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          // delete local storage
          // redirect to sign in
        }
        ]
      }
    ];
  }

}
