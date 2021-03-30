import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){ }

    postData(path : string, data : any) {
        const body = data;
        return this.http.post(path, body);
    }

    getData(path : string) {
        return this.http.get(path);
    }
}

@Injectable()
export class PhotoService {
    private photos : Photo[] = [];

    getPhotos() : any {
        return [...this.photos];
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

    id : number = 0;
    name : string = "";
    path : string = "";
    datetimeUpload : Date | undefined;
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

