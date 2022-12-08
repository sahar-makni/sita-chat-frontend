import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-image',
  templateUrl: './stat-image.component.html',
  styleUrls: ['./stat-image.component.scss']
})
export class StatImageComponent implements OnInit {

  @Input() userMessagesCount: number;
  @Input() userRoomsCount: number;
  constructor() {
  }

  ngOnInit(): void {
  }

}
