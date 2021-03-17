import { Component } from '@angular/core';


@Component({
    selector: 'app-greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.css', '../app.component.css']
})
export class GreetingComponent {
    projectName: string = "KaisereichWiki";
    projectYear: number = new Date().getFullYear();
}
