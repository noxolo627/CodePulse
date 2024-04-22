import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetBlogPostRequest } from '../models/get-blogs-request.model';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addBlogPost(model: AddBlogPostRequest): Observable<AddBlogPostRequest>{
    return this.http.post<AddBlogPostRequest>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, model);
  }

  getAllBlogPosts(): Observable<GetBlogPostRequest[]>{
    return this.http.get<GetBlogPostRequest[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById (id: string): Observable<GetBlogPostRequest>{
    return this.http.get<GetBlogPostRequest>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrl (urlHandle: string): Observable<GetBlogPostRequest>{
    return this.http.get<GetBlogPostRequest>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  updateBlogPost(id: string, model: UpdateBlogPostRequest): Observable<UpdateBlogPostRequest>{
    return this.http.put<UpdateBlogPostRequest>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, model);
  }

  deleteBlogPost(id: string){
    return this.http.delete<GetBlogPostRequest>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }
}

