import { Component } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css', '../app.component.css']
})
export class NavigationComponent {
    projectName : string = "KaisereichWiki";
    projectYear : number = new Date().getFullYear(); 
}