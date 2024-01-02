import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from '../store/chats/chats.state';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';
import { addMessage } from '../store/chats/chats.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store<{ messages: { messages: Message[] } }>,
    private ws: WebsocketService
  ) {}

  messages!: Observable<Message[]>;
  ngOnInit(): void {
    this.messages = this.store.select((state) => state.messages.messages);
    this.ws.receiveMessage().subscribe((text: any) => {
      console.log(text);
      this.store.dispatch(
        addMessage({ message: { type: 'receive', text: text } })
      );
      this.store.select('messages').subscribe((data) => {
        console.log(data);
      });
    });
  }
}
