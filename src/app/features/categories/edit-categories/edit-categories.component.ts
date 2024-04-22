import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { GetCategoryRequest } from '../models/get-category-request.models';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
})
export class EditCategoriesComponent implements OnInit, OnDestroy {
  model?: GetCategoryRequest;
  id: string | null = null;
  paramSubscription?: Subscription;
  category?: GetCategoryRequest;

  private editCategorySubscription: Subscription | undefined;
  private deleteCategorySubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        localStorage.setItem('getCategoryId', `${params.get('id')}`)

        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (res) => {
              this.category = res;
            },
          });
        }
      },
      error: (err) => {},
    });
  }

  onFormSubmit(): void {
    //create the object to pass to the update service
    const UpdateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };

    //pass the object to the service
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, UpdateCategoryRequest)
      .subscribe({
        next: ()=>{
          this.router.navigateByUrl(`/admin/categories`)
        }
      });
    }
  }

  onDelete(): void {
    if(this.id){
      this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id)
      .subscribe(
        {
          next: ()=>{
            this.router.navigateByUrl(`/admin/categories`)
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }
}
