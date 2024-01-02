import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageInputComponent } from './message-input/message-input.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { chatReducer } from './store/chats/chats.reducer';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WebsocketService } from './services/websocket.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const config: SocketIoConfig = {
  url: 'http://localhost:3002',
  options: { transports: ['websocket'] },
};

@NgModule({
  declarations: [AppComponent, MessageInputComponent, HomeComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ messages: chatReducer }),
    FormsModule,
    SocketIoModule.forRoot(config),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
