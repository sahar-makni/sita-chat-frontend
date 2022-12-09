import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatRoomResponse} from '../../chat-room.type';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {

  @Input() room: ChatRoomResponse;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
  }

  addRemoveFromFavorites(roomId: number): void {
    console.log('addRemoveFromFavorites = ' + roomId);
    // todo: call the add remove room from favorite ws
  }

  selectChatRoom(): void {
    console.log('selectChatRoom');
    this.router.navigate([this.room.id], {relativeTo: this.route}).then();
  }
}
