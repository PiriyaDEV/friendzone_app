export default class Chat {
  constructor(chat) {
    this.chat_id = chat.chat_id;
    this.sender_id = chat.sender_id;
    this.message = chat.message;
    this.created_at = chat.created_at;
    this.updated_at = chat.updated_at;
  }
}
