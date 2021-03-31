import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Account, HttpService } from '../data/data.service';

@Component({
    selector: 'app-accountlogin',
    templateUrl: './accountlogin.component.html',
    styleUrls: ['./accountlogin.component.css', '../app.component.css'],
    providers: [HttpService]
})
export class AccountLoginComponent {

    account: Account = new Account("", "", "");

    done : boolean = false;
    errorFlag : boolean = false;
    errorMessage : string = "Error";

    constructor(private httpService: HttpService, private router : Router){}
    submit() {
        this.httpService.postData("http://localhost:1337/account/login", this.account).subscribe(
            () => {
                this.done = true;
                this.router.navigate([""]);
            },
            error => {
                this.errorFlag = true;
                this.errorMessage = "Неверный email или пароль!";
            }
        );
    };
}
