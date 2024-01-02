import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private io: Socket) { }

  sendMessage(message: string){
    this.io.emit('send-message' , message);
  }

  receiveMessage(){
    return this.io.fromEvent('receive-message');
  }
}
