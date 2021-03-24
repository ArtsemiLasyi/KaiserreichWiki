import { Component, Input } from '@angular/core';
import { Photo } from '../data/data.service';

@Component({
    selector: 'app-articlelist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.css', '../app.component.css']
})
export class PhotoListComponent {
    
    photos : Photo[] | undefined;

    deletePhoto() {
        alert("To do");
    }
}