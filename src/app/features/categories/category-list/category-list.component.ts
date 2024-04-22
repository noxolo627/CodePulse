import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { GetCategoryRequest } from '../models/get-category-request.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  usersServices(usersServices: any, arg1: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private categoryService: CategoryService){}
    // categories?: GetCategoryRequest[];

    categories$?: Observable<GetCategoryRequest[]>;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
}
