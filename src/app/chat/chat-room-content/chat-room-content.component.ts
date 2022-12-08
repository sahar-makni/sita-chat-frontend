import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-chat-room-content',
  templateUrl: './chat-room-content.component.html',
  styleUrls: ['./chat-room-content.component.scss']
})
export class ChatRoomContentComponent implements OnInit {
  roomId: number;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.roomId = +params.get('id');
    });
  }

}
