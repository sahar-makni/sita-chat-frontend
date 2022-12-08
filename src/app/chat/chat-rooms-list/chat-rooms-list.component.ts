import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-rooms-list',
  templateUrl: './chat-rooms-list.component.html',
  styleUrls: ['./chat-rooms-list.component.scss']
})
export class ChatRoomsListComponent implements OnInit {

  userRooms: { name: string }[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      console.log(i);
      this.userRooms.push({name: `room${[i]}`});
    }
    console.log(this.userRooms);
  }

}
