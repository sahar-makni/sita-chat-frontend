export interface ChatRoomResponse {
  id: number;
  name: string;
  userIds: number[];
  lastMessageTime: Date;

}

export interface MessageResponse {
  id: number;
  roomId: number;
  senderId: number;
  text: string;
  sendDate: Date;
}
