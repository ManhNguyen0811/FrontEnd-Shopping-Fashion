import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng ngClass và *ngFor
import { FormsModule } from '@angular/forms';
import { ChatbotService} from '../../services/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  showChatbot = false; // Ẩn/hiện chatbot
  chatbox: { message: string; className: string }[] = [];
  userMessage = '';

  constructor(private chatbotService: ChatbotService) {}

  toggleChat(): void {
    this.showChatbot = !this.showChatbot;
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    const message = this.userMessage.trim();
    this.chatbox.push({ message, className: 'outgoing' });

    this.chatbotService.sendMessage(message).subscribe(
      (response) => {
        this.chatbox.push({ message: response, className: 'incoming' });
      },
      (error) => {
        this.chatbox.push({ message: 'Lỗi! Không thể kết nối API.', className: 'error' });
      }
    );

    this.userMessage = ''; // Reset input
  }
}
