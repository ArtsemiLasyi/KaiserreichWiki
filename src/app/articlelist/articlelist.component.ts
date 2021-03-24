import { Component, Input } from '@angular/core';
import { Article } from '../data/data.service';

@Component({
    selector: 'app-articlelist',
    templateUrl: './articlelist.component.html',
    styleUrls: ['./articlelist.component.css', '../app.component.css']
})
export class ArticleListComponent {
    
    articles : Article[] | undefined;
}