import { Component, Input } from '@angular/core';
import { Photo, HttpService } from '../data/data.service';

@Component({
    selector: 'app-articlelist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.css', '../app.component.css'],
    providers: [HttpService]
})
export class PhotoListComponent {
    
    photos : Photo[] | undefined;

    selectedFile : any;

    private defaultFileName : string = "Добавить фото";

    fileName : string = this.defaultFileName;


    constructor (private httpService: HttpService) {

    }

    deletePhoto() {
        alert("To do");
    }

    editPhoto() {
        alert("To do");
    }

    addPhoto() {

        let photo = new Photo();
        photo.datetimeUpload = new Date();
        photo.path = this.fileName;

        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        this.httpService.postData("http://localhost:1337/account", uploadData).subscribe();
    }

    loadPhoto(event : any) : any {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile?.name;
    }

    getPhoto() {
        alert("To do");
    }
}