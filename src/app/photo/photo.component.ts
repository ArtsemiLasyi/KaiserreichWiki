import { Component } from '@angular/core';
import { Photo } from '../data/data.service';
     
@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
     photos: Photo[] = [];
}