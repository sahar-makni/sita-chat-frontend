import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatRoomResponse, MessageResponse} from './chat-room.type';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MESSAGES_WS_PATH, ROOM_WS_PATH} from '../utils/const/general';

@Injectable({providedIn: 'root'})
export class ChatRoomService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getChatRooms(): Observable<ChatRoomResponse[]> {
    return this.httpClient.get<ChatRoomResponse[]>(
      `${environment.baseUrl}${ROOM_WS_PATH}`
    );
  }

  getRoomMessages(roomId: number): Observable<MessageResponse[]> {
    const url = `${environment.baseUrl}${ROOM_WS_PATH}/${roomId}${MESSAGES_WS_PATH}`;
    return this.httpClient.get<MessageResponse[]>(url);
  }

}
