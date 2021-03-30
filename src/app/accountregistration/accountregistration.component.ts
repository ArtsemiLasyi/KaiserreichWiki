import { Component, Input } from '@angular/core';
import { Account, HttpService } from '../data/data.service';

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

    constructor(private httpService: HttpService){}
    submit() {
        this.httpService.postData("http://localhost:1337/account/registation", this.account).subscribe(
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
