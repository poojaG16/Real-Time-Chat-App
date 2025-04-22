import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { WebsocketService } from '../../services/websocket.service';
import { UserService } from '../../services/user.service';
import {MatIconModule} from '@angular/material/icon';

interface Message {
  sender: string,
  message: string
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

  constructor(private _webSocketService: WebsocketService, private _userService: UserService) {
  }

  ngOnInit(): void {
    //het current logged user
    this._userService.getCurrentUser().subscribe({
      next: (username) => {
        if (username) {
          this.currentUser = username;
        } else {
          this.currentUser = 'Dummy'
        }

      },
      error: (err) => {
        console.log("Error while getting username.", err)
      }
    })

    this._webSocketService.getMessages().subscribe({
      next: (res: any) => {
        console.log("res: ", res)
        this.messages.push(res);
        // console.log("Received all Messages. ", this.messages)
      },
      error: (error: any) => {
        console.log("Error while fetching the messages! ", error)
      }
    })
  }
  sendMessage() {
    // console.log("Message is ", !this.newMessage)
    const data: Message = { sender: this.currentUser, message: this.newMessage };
    // Add the sent message to the messages array
    this.messages.push(data);

    this._webSocketService.sendMessage(data);
    this.newMessage = '';

  }
}
