import {Component, OnInit} from '@angular/core';
import {ChatRoomService} from '../chat-room.service';
import {ChatRoomResponse} from '../chat-room.type';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss']
})
export class ChatRoomListComponent implements OnInit {

  userRooms: ChatRoomResponse[] = [];

  constructor(private readonly chatRoomService: ChatRoomService) {
  }

  ngOnInit(): void {
    this.chatRoomService.getChatRooms().subscribe((chatRoomResponse: ChatRoomResponse[]) => {
      this.userRooms = chatRoomResponse;
    });
  }

}
