import { Component } from '@angular/core';
import { HttpService } from '../data/data.service';


@Component({
    selector: 'app-articleadd',
    templateUrl: './articleadd.component.html',
    styleUrls: ['./articleadd.component.css', '../app.component.css'],
    providers: [HttpService]
})
export class ArticleAddComponent {
    
    isCode : boolean = true;

    articleText : string;
    articleName : string;

    selectedFile : File | undefined;

    constructor(private httpService: HttpService) {
        this.articleName = "";
        this.articleText = "";
    }

    makeBold() : any {

        const selection = document.getSelection();
        const text = document.getElementById('articleText');
        const replaceText = selection?.toString();
        (text as HTMLTextAreaElement).value = (text as HTMLTextAreaElement).value.replace(replaceText!,"<b>" + replaceText + "</b>");
    }

    makeItalic() : any {

        const selection = document.getSelection();
        const text = document.getElementById('articleText');
        const replaceText = selection?.toString();
        (text as HTMLTextAreaElement).value = (text as HTMLTextAreaElement).value.replace(replaceText!,"<i>" + replaceText + "</i>");
    }

    makeUnderline() : any {

        const selection = document.getSelection();
        const text = document.getElementById('articleText');
        const replaceText = selection?.toString();
        (text as HTMLTextAreaElement).value = (text as HTMLTextAreaElement).value.replace(replaceText!,"<u>" + replaceText + "</u>");
    }

    addLink() : any {

        const selection = document.getSelection();
        const text = document.getElementById('articleText');
        const replaceText = selection?.toString();
        (text as HTMLTextAreaElement).value = (text as HTMLTextAreaElement).value;
    }

    addPicture(event : any) : any {

        this.selectedFile = event.target.files[0];
        this.httpService.postData('/photo/add', this.selectedFile).subscribe(event => {
            console.log(event);
        });;
    }

    showCode() : any {
        this.isCode = true;
    }

    showView() : any {
        this.isCode = false;
        const view = document.getElementById('articleView');
        const text = document.getElementById('articleText');
        (view as Element).innerHTML = (text as HTMLTextAreaElement).value;
    }

    addArticle() : any {
        const text = document.getElementById('articleText');
        this.articleText = (text as Element).innerHTML;
        alert(this.articleName);
        alert(this.articleText);
    }

}