import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../services/blog.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { GetBlogPostRequest } from '../models/get-blogs-request.model';
import { CategoryService } from '../../categories/services/category.service';
import { GetCategoryRequest } from '../../categories/models/get-category-request.models';
import { ImageServiceService } from 'src/app/shared/services/image-service.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css']
})
export class AddBlogPostComponent implements OnDestroy, OnInit {

  model: AddBlogPostRequest;
  categories?: Observable<GetCategoryRequest[]>;

  private addBlockSubscription?: Subscription;
  imageSubscription?: Subscription;
  isImageSelectorOpen: boolean = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageServiceService,
  ) {
    this.model = {
      title: "",
      shortDescription: "",
      content: "",
      featuredImageUrl: "",
      urlHandle: "",
      publishedDate: "",
      author: "",
      isVisible: true,
      categories: [],
    }
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategories();

    this.imageSubscription = this.imageService.onImageSelection()
      .subscribe({
        next: (res) =>{
          if(this.model){
              this.model.featuredImageUrl = res.url;
              this.isImageSelectorOpen = false;
            }
          }
      });
  }

  onFormSubmit(){
    console.log(`\n ${this.model}`);
    this.addBlockSubscription = this.blogService.addBlogPost(this.model)
      .subscribe({
        next: (res)=>{
          this.router.navigateByUrl('admin/blog-post');
        }
    });
  }

  onCancel() {
    this.isImageSelectorOpen = false;
    }

  openImageSelector() {
    this.isImageSelectorOpen = true;
  }

  ngOnDestroy(): void {
    this.addBlockSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }
}
