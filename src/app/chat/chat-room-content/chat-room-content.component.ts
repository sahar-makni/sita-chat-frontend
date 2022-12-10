import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MessageResponse} from "../chat-room.type";
import {ChatRoomService} from "../chat-room.service";
import {UserService} from "../../common/user.service";
import {MessageItemPosition} from "./message-item/message-item.component";

@Component({
  selector: 'app-chat-room-content',
  templateUrl: './chat-room-content.component.html',
  styleUrls: ['./chat-room-content.component.scss']
})
export class ChatRoomContentComponent implements OnInit {
  roomId: number;

  roomMessages: MessageResponse[] = [];
  newMessage: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly chatRoomService: ChatRoomService,
              private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roomId = +params.get('id');
      this.loadMessages(this.roomId);
    });
  }

  private loadMessages(roomId: number): void {
    this.chatRoomService.getRoomMessages(roomId).subscribe((messages: MessageResponse[]) => this.roomMessages = messages
    );
  }

  messagePosition(senderId: number): MessageItemPosition {
    return (senderId === this.userService.getUserId()) ? 'LEFT' : 'RIGHT';
  }

  sendMessage(): void {
    this.chatRoomService.sendMessage(this.roomId, this.newMessage).subscribe();
    this.newMessage = '';
  }
}
