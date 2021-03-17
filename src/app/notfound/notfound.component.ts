import { Component } from '@angular/core';


@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.css', '../app.component.css']
})
export class NotFoundComponent {
    projectName: string = "KaisereichWiki";
    projectYear: number = new Date().getFullYear();
}
