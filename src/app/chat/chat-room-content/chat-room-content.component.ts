import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MessageResponse} from '../chat-room.type';
import {ChatRoomService} from '../chat-room.service';
import {UserService} from '../../common/user.service';
import {MessageItemPosition} from './message-item/message-item.component';
import {ScrollPanel} from 'primeng/scrollpanel';

@Component({
  selector: 'app-chat-room-content',
  templateUrl: './chat-room-content.component.html',
  styleUrls: ['./chat-room-content.component.scss']
})
export class ChatRoomContentComponent implements OnInit {
  roomId: number;

  roomMessages: MessageResponse[] = [];
  newMessage: string;

  // TODO : find a correct way to scroll to bottom without using large numbers
  @ViewChild(ScrollPanel) scrollPanel: ScrollPanel;
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
