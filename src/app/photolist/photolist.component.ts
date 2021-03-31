import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Photo, HttpService } from '../data/data.service';

@Component({
    selector: 'app-articlelist',
    templateUrl: './photolist.component.html',
    styleUrls: ['./photolist.component.css', '../app.component.css'],
    providers: [HttpService]
})
export class PhotoListComponent {

    photos : Photo[] = [];

    uploadsPath = "assets/uploads/";

    selectedFile : File | undefined;

    private defaultFileName : string = "Добавить фото";

    fileName : string = this.defaultFileName;

    photoName : string = "";

    errorFlag = false;

    constructor (private httpService: HttpService) {

    }

    ngOnInit(){

        this.getPhotos();
    }

    deletePhoto(id : number) {
        alert("To do");
    }

    editPhoto(id : number) {

    }

    getPhotos() {
      this.httpService.getData("http://localhost:1337/photo").subscribe(
          (data : any) => {
            this.photos = data.photos;
          }
      );
    }

    addPhoto(form : NgForm) {
        if (!this.selectedFile) {
          this.errorFlag = true;
          return;
        } else {
          this.errorFlag = false;
        }

        const formData = new FormData();
        formData.append("path", this.fileName);
        formData.append("name", form.value.fileName);
        formData.append("file", this.selectedFile, this.selectedFile.name);
        this.httpService.postData("http://localhost:1337/photo", formData).subscribe();
        this.getPhotos();
    }

    loadPhoto(event : any) : any {
        this.selectedFile = event.target.files[0];
        this.fileName = this.selectedFile?.name || "Добавить фото";
    }

    /*
    addPhoto() {

        let photo = new Photo();
        photo.datetimeUpload = new Date();
        photo.path = this.fileName;

        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        this.httpService.postData("http://localhost:1337/account", uploadData).subscribe();
    }




    }
    */
}
