import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
    private messages : Message[] = [];
    messageIsEdit = new EventEmitter<>(Message);
    
    constructor(private http: Http, private errorService: ErrorService) {
    }
    
    addMessage(message : Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type' : 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
            .map((response : Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id
                );
                this.messages.push(message);
                return message;
            })
            .catch((error : Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    
    editMessage(message : Message){
        this.messageIsEdit.emit(message);
    }
}