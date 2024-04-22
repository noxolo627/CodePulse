import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetCategoryRequest } from '../models/get-category-request.models';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<AddCategoryRequest>{
   return this.http.post<AddCategoryRequest>(`${environment.apiBaseUrl}/api/categories`, model);
  }

  getAllCategories(): Observable<GetCategoryRequest[]>{
    return this.http.get<GetCategoryRequest[]>(`${environment.apiBaseUrl}/api/categories?addAuth=true`);
  }

  getCategoryById (id: string): Observable<GetCategoryRequest>{
    return this.http.get<GetCategoryRequest>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  updateCategory(id: string, model: UpdateCategoryRequest): Observable<GetCategoryRequest>{
    return this.http.put<GetCategoryRequest>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`, model);
  }

  deleteCategory(id: string){
    return this.http.delete<GetCategoryRequest>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`);
  }
}
