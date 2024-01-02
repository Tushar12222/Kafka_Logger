import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from '../store/chats/chats.state';
import { addMessage } from '../store/chats/chats.actions';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent implements OnInit {
  constructor(
    private store: Store<{ messages: { messages: Message[] } }>,
    private ws: WebsocketService
  ) {}

  text!: string;

  ngOnInit(): void {}

  sendMessage() {
    if (this.text != '') {
      this.store.dispatch(
        addMessage({ message: { type: 'send', text: this.text } })
      );
      this.ws.sendMessage(this.text);
    }
    this.text = '';
  }
}
