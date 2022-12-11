import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {ChatRoomResponse, MessageResponse} from './chat-room.type';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MESSAGES_WS_PATH, ROOM_WS_PATH, USER_WS_PATH} from '../utils/const/general';
import {switchMap, tap} from 'rxjs/operators';
import {UserResponse} from '../common/user.type';

@Injectable({providedIn: 'root'})
export class ChatRoomService {
  usersMap: { [userId: number]: UserResponse } = {};
  private chatRoomResponses: ChatRoomResponse[] = [];
  selectedRoomId = -1; // No room selected by default
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getChatRooms(): Observable<ChatRoomResponse[]> {
    return this.httpClient.get<ChatRoomResponse[]>(
      `${environment.baseUrl}${ROOM_WS_PATH}`
    ).pipe(
      tap((chatRoomResponses: ChatRoomResponse[]) => {
        this.chatRoomResponses = chatRoomResponses;
      })
    );
  }

  getRoomMessages(roomId: number): Observable<MessageResponse[]> {
    const url = `${environment.baseUrl}${ROOM_WS_PATH}/${roomId}${MESSAGES_WS_PATH}`;
    // FIXME: polling the backend is not a good solution.
    //  Ideally, this should go through a websocket.
    // observable that ticks immediately and every 1 second
    const pollingTimer = timer(0, 1000);
    return pollingTimer.pipe(
      switchMap(() => {
        return this.httpClient.get<MessageResponse[]>(url);
      })
    );

  }

  sendMessage(roomId: number, newMessage: string): Observable<void> {
    const url = `${environment.baseUrl}${ROOM_WS_PATH}/${roomId}${MESSAGES_WS_PATH}`;
    return this.httpClient.post<void>(url, {text: newMessage});
  }

  getUserInfo(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${environment.baseUrl}${USER_WS_PATH}/${userId}`);

  }

  getSelectedChatRoomUsers(): void {
    if (this.chatRoomResponses.length === 0) {
      this.getChatRooms().subscribe(() => {
        const selectedRoom = this.chatRoomResponses
          .find((chatRoomResponse: ChatRoomResponse) => chatRoomResponse.id === this.selectedRoomId);
        if (selectedRoom) {
          this.getChatRoomUsers(selectedRoom);
        }
      });
    }
  }

  getChatRoomUsers(room: ChatRoomResponse): void {
    // update the usersMap with missing users if necessary
    const missingUserIds = room.userIds.filter(userId => !this.usersMap[userId]);
    missingUserIds.forEach(userId => this.getUserResponseAndCache(userId).subscribe());
  }

  private getUserResponseAndCache(userId: number): Observable<UserResponse> {
    return this.getUserInfo(userId).pipe(
      tap(userResponse => this.usersMap[userResponse.id] = userResponse)
    );
  }
}
