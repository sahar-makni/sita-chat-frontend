import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stat-image',
  templateUrl: './stat-image.component.html',
})
export class StatImageComponent {

  @Input() userMessagesCount: number;
  @Input() userRoomsCount: number;
}
