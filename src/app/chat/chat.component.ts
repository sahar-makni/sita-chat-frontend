import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private readonly title: Title,
    private readonly activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.activatedRoute.snapshot.data.title);
  }

}
