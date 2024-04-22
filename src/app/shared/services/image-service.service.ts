import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadImageRequest } from '../models/upload-images.model';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }

  selectedImage = new BehaviorSubject<UploadImageRequest>({
    id: '',
    title: '',
    url: '',
    fileExtention: '',
    dateCreated: '',
  })

  uploadImage (file: File, title: string, fileName:string): Observable<UploadImageRequest>{

    const formData = new FormData();
    formData.append('title',title);
    formData.append('file', file);
    formData.append('fileName', fileName);

    return this.http.post<UploadImageRequest>(`${environment.apiBaseUrl}/api/blogimages`, formData);
  }

  getAllImages(): Observable<UploadImageRequest[]>{
    return this.http.get<UploadImageRequest[]>(`${environment.apiBaseUrl}/api/blogimages`);
  }

  selectImage(image: UploadImageRequest): void{
    this.selectedImage.next(image);
  }

  onImageSelection(): Observable<UploadImageRequest>{
    return this.selectedImage.asObservable();
  }

}
