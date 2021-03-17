import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent {
    projectName : string = "KaisereichWiki";
    projectYear : number = new Date().getFullYear(); 
}