import { Component, Input } from '@angular/core';
import { Account, HttpService } from '../data/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accountregistration',
    templateUrl: './accountregistration.component.html',
    styleUrls: ['./accountregistration.component.css', '../app.component.css'],
    providers: [HttpService]
})
export class AccountRegistrationComponent {

    account: Account = new Account("", "", "");

    done : boolean = false;
    errorFlag : boolean = false;
    errorMessage : string = "Error";

    constructor(private httpService: HttpService, private router : Router){}

    submit() {
        this.httpService.postData("http://localhost:1337/account/registration", this.account).subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigate([""]);
          },
          (error : any) => {
            this.errorFlag = true;
            this.errorMessage = "Ошибка при регистрации";
          }
        );
    };
}
