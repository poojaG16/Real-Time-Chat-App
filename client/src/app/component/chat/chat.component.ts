import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { WebsocketService } from '../../services/websocket.service';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';

interface Message {
  sender: string,
  message: string,
  type: string
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  newMessage: string = '';
  currentUser!: string;
  typingUser: string | null = null;
  typingTimeout: any;

  constructor(private _webSocketService: WebsocketService, private _userService: UserService) {
  }

  ngOnInit(): void {
    //het current logged user
    this._userService.getCurrentUser().subscribe({
      next: (username) => {
        if (username) {
          this.currentUser = username;
        } else {
          this.currentUser = 'Guest'
        }

      },
      error: (err) => {
        console.log("Error while getting username.", err)
      }
    })

    this._webSocketService.getMessages().subscribe({
      next: (res: any) => {
        

        if (res.type === 'typing') {
          // console.log("ws res in type typing: ", res);
          // Display typing indicator
          this.typingUser = res.sender;
          setTimeout(() => {
            this.typingUser = null; // Remove typing indicator after 3 seconds
          }, 3000);
        } else if (res.type === 'message') {
          // console.log("ws res in type message: ", res);
          // Ensure the message is valid before adding it to the array
          if (res.sender && res.message) {
            // console.log("ws res: ", this.messages);
            this.messages.push(res);
          }
        }
      },
      error: (error: any) => {
        console.log("Error while fetching the messages! ", error)
      }
    })
  }

  sendMessage() {
    const data: Message = { sender: this.currentUser, message: this.newMessage, type: 'message' };
    this.messages.push(data);

    this._webSocketService.sendMessage(data);
    this.newMessage = '';

  }

  onTyping() {
    this._webSocketService.sendMessage({ type: 'typing', sender: this.currentUser });

    // Reset typing timeout
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    // Stop typing after 3 seconds of inactivity
    this.typingTimeout = setTimeout(() => {
      this._webSocketService.sendMessage((JSON.stringify({ type: 'stopTyping', sender: this.currentUser })));
    }, 3000);

  }
}
