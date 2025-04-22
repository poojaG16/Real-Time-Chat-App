import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private wsUrl = environment.wsUrl;
  private ws: WebSocketSubject<any> = new WebSocketSubject(this.wsUrl);

  constructor() {

   }

   sendMessage(msg: any){
    this.ws.next(msg)
   }

   getMessages() {
    return this.ws.asObservable();
  }

}
