import { Component } from '@angular/core';
import { Article } from '../data/data.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css', '../app.component.css']
})
export class ArticleComponent {
     articles: Article[] = [];
}