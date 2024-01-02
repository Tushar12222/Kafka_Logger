export interface Message {
  type: string;
  text: string;
}

const texts: Message[] = [];

export const initialState = {
  messages: texts,
};
