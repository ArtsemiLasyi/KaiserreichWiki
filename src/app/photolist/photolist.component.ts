import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Photo, HttpService } from '../data/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

    editModeFlag = false;   // Flag which shows if edit mode is enabled
    editedPhoto : any;        // Photo to edit

    constructor (private httpService: HttpService,
                 private router : Router,
                 private route : ActivatedRoute) {

    }

    ngOnInit(){

      this.getPhotos();
    }

    deletePhoto(id : number) {
      this.httpService.deleteData("http://localhost:1337/photo/" + id, id).subscribe();
      this.router.navigate(['/photo'], { relativeTo: this.route });
    };

    editPhoto(photo : Photo) {
      this.editModeFlag = true;
      this.editedPhoto = photo;
      this.fileName = photo.path;
      this.photoName = photo.name;
    }

    getPhotos() {
      this.httpService.getData("http://localhost:1337/photo").subscribe(
        (data : any) => {
          this.photos = data.photos;
        }
      );
    }

    sendPhoto(form : NgForm) {
      if (!this.editModeFlag && !this.selectedFile) {
        this.errorFlag = true;
        return;
      } else {
        this.errorFlag = false;
      }

      const formData = new FormData();
      formData.append("path", this.fileName);
      formData.append("name", form.value.photoName);
      if (!this.editModeFlag) {
        formData.append("file", this.selectedFile!, this.selectedFile!.name);
        this.httpService.postData("http://localhost:1337/photo", formData).subscribe();
      } else {
        this.httpService.updatedata("http://localhost:1337/photo/" + this.editedPhoto.id, formData).subscribe();
        this.editModeFlag = false;
      }
      this.router.navigate(['/photo'], { relativeTo: this.route });
    }

    cancelEdit() {
      this.fileName = "Добавить фото";
      this.editModeFlag = false;
    }

    loadPhoto(event : any) : any {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile?.name || "Добавить фото";
    }


}
