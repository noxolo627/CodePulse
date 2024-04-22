import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageServiceService } from '../../services/image-service.service';
import { UploadImageRequest } from '../../models/upload-images.model';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnDestroy, OnInit {

  private file?: File;
  fileName: string = '';
  title: string = '';

  @Output() customEvent = new EventEmitter<string[] | File>();
  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;

  uploadImagesSubscription?: Subscription;
  getImagesSubscription?: Subscription;
  images$?: Observable<UploadImageRequest[]>
  isImageSelectorOpen: boolean = false;


  constructor(private uploadImageService: ImageServiceService){}

  ngOnInit(): void {
    this.getImages();
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0]
  }

  onImageUpload() {

    if(this.file && this.title !== '' && this.fileName !==''){
      this.uploadImagesSubscription = this.uploadImageService.uploadImage(this.file, this.title,this.fileName)
          .subscribe({
            next: (res) =>{
              this.getImages();
            }
          });
    }
  }

  openImageSelector(): void{
    this.isImageSelectorOpen = true;

  }

  private getImages():void{
    this.images$ = this.uploadImageService.getAllImages();
  }

  getSelectedImage(image: UploadImageRequest): void {
    this.uploadImageService.selectImage(image);
  }

  emitEvent(){
    if(this.file && this.fileName && this.title){
      this.customEvent.emit( );
    }
  }



  ngOnDestroy(): void {
    this.uploadImagesSubscription?.unsubscribe();
    this.getImagesSubscription?.unsubscribe();
  }
}
