import { Component, Input } from '@angular/core';
import { Account, HttpService } from '../data/data.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css', '../app.component.css'],
    providers: [HttpService]
})
export class AccountComponent {
    
    account: Account = new Account("", "", "");

    done: boolean = false;


    constructor(private httpService: HttpService){}
    submit(){
        alert("a");
        this.httpService.postData("/account", this.account);
    };
}