import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-rooms-list',
  templateUrl: './chat-rooms-list.component.html',
  styleUrls: ['./chat-rooms-list.component.scss']
})
export class ChatRoomsListComponent implements OnInit {

  userRooms: { id: number, name: string }[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // this is just temporary
    // todo: call get user rooms ws
    for (let i = 0; i < 20; i++) {
      this.userRooms.push({id: i, name: `room${[i]}`});
    }
  }

}
