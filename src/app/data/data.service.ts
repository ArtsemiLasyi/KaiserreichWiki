import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
 
    postData(str : string, data : any){
        const body = { data : data}
        return this.http.post(str, body); 
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
        this.login = login;
        this.password = password;
        this.email = email;
    }

    login : string = "";

    email : string = "";

    password : string = "";
}

