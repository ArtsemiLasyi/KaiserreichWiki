import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
 
    postData(str : string, data : any){
        return this.http.post(str, data); 
    }
}

export class Article {

    name : string;

    text : string;

    //photos : Photo[];

    constructor(name : string, text : string) {

        this.name = name;
        this.text = text;
    }
}

export class Photo {
    
}

export class Account {

    constructor (login : string, password : string, email : string) {
        this._login = login;
        this._password = password;
        this._email = email;
    }

    _login : string = "";

    _email : string = "";

    _password : string = "";
}

