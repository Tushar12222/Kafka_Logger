import { createAction, props } from '@ngrx/store';
import { Message } from './chats.state';

export const addMessage = createAction(
  'addMessage',
  props<{ message: Message }>()
);
