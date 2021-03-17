import { Component, Input } from '@angular/core';
import { Account } from '../data/data.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css', '../app.component.css']
})
export class AccountComponent {
    
    account: Account = new Account("", "");
     
    accounts: Account[] = [];

    addAccount(){
        this.accounts.push(new Account(this.account._login, this.account._password));
    }

}