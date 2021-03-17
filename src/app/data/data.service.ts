import { HttpClient } from '@angular/common/http';

export class Article {

}

export class Photo {
    
}

export class Account {

    constructor (login : string, password : string) {
        this._login = login;
        this._password = password;
    }

    _login : string = "";

    _password : string = "";
}

