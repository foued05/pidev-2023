import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bull-conversation',
  templateUrl: './bull-conversation.component.html',
  styleUrls: ['./bull-conversation.component.scss']
})
export class BullConversationComponent implements OnInit {

  messages: { sender: string, content: string }[] = [];
  newMessage: string = '';

  messageCount = 5;

  mode = "";

  bullStatus = false;

  constructor() { }

  ngOnInit(): void {
    this.mode = localStorage.getItem('mode');
    console.log(this.mode);
  }

  sendMessage() {
    if (this.newMessage) {
      this.messages.push({ sender: 'Me', content: this.newMessage });
      this.newMessage = '';
    }
  }

  openBull(){
    this.bullStatus = true;
  }

  closeBull(){
    this.bullStatus = false;
  }

}
