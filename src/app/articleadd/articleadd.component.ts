import { Component } from '@angular/core';


@Component({
    selector: 'app-articleadd',
    templateUrl: './articleadd.component.html',
    styleUrls: ['./articleadd.component.css', '../app.component.css']
})
export class ArticleAddComponent {
    
    isCode : boolean = true;

    articleText : string = "";

    makeBold() : any {

        const selection = document.getSelection();
        const text = document.getElementById('articletext');
        const replaceText = selection?.toString();
        (text as HTMLTextAreaElement).value = (text as HTMLTextAreaElement).value;
    }

    showCode() : any {
        this.isCode = true;
    }

    showView() : any {
        this.isCode = false;
    }

}