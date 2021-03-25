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

    done : boolean = false;
    errorFlag : boolean = false; 
    errorMessage : string = "Error";

    constructor(private httpService: HttpService){}
    submit() {
        this.httpService.postData("http://localhost:1337/account", this.account).subscribe(
            (data: any) => {
                this.account = data; 
                this.done = true;
            },
            error => {
                this.errorFlag = true;
                this.errorMessage = error.message.ToString();
            }
        );
    };
}