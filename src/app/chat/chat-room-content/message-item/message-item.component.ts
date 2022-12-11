import {Component, HostBinding, Input} from '@angular/core';

export type MessageItemPosition = 'LEFT' | 'RIGHT';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {
  @Input() messageText: string;
  @Input() messageDate: Date;
  @Input() messagePosition: MessageItemPosition;
  @Input() senderName: string;

  @HostBinding('class.p-as-end')
  get isSender(): boolean {
    return this.messagePosition === 'LEFT';
  }

  @HostBinding('class.p-as-start')
  get isReceiver(): boolean {
    return this.messagePosition === 'RIGHT';
  }
}
