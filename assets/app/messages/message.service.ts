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
    
    addMessage(){
        
    }
}