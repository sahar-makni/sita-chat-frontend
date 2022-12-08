import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input() room: { id: number, name: string };

  constructor() {
  }

  ngOnInit(): void {
  }

  addRemoveFromFavorites(roomId: number): void {
    console.log('addRemoveFromFavorites = ' + roomId);
    // todo: call the add remove room from favorite ws
  }
}
