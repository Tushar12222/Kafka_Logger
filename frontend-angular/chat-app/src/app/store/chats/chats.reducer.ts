import { createReducer, on } from '@ngrx/store';
import { initialState, Message } from './chats.state';
import { addMessage } from './chats.actions';



const _chatReducer = createReducer(
  initialState,
  on(addMessage, (state , action) => {
    return {
      ...state,
      messages: [...state.messages , action.message]
    };
  })
);

export function chatReducer(state: any, action: any) {
  return _chatReducer(state, action);
}
