import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8080/chat-ai'; // Cập nhật URL API nếu cần

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    return this.http.get(this.apiUrl, { params: { message } });
  }
}
