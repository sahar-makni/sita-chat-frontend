import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type MessageItemPosition =  'LEFT' | 'RIGHT';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() messageText: string;
  @Input() messageDate: Date;
  @Input() messagePosition: MessageItemPosition;
  constructor() { }
  @HostBinding('class.p-as-end')
  get isSender(): boolean{
    return this.messagePosition === 'LEFT';
  }
  @HostBinding('class.p-as-start')
  get isReceiver(): boolean{
    return this.messagePosition === 'RIGHT';
  }

  ngOnInit(): void {
  }

}
