import { Component, Input } from '@angular/core';
import { Article } from '../data/data.service';

@Component({
    selector: 'app-articlelist',
    templateUrl: './articleinfo.component.html',
    styleUrls: ['./articleinfo.component.css', '../app.component.css']
})
export class ArticleInfoComponent {
    
    article : Article;

    constructor() {
        this.article = new Article("", "");
    }
}