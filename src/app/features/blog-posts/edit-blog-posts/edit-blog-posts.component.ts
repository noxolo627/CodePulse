import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetBlogPostRequest } from '../models/get-blogs-request.model';
import { Observable, Subscription } from 'rxjs';
import { GetCategoryRequest } from '../../categories/models/get-category-request.models';
import { CategoryService } from '../../categories/services/category.service';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.models';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageServiceService } from 'src/app/shared/services/image-service.service';

@Component({
  selector: 'app-edit-blog-posts',
  templateUrl: './edit-blog-posts.component.html',
  styleUrls: ['./edit-blog-posts.component.css'],
})
export class EditBlogPostsComponent implements OnInit, OnDestroy {
  model?: GetBlogPostRequest;
  id: string | null = null;
  categories$?: Observable<GetCategoryRequest[]>;
  selecteCategories?: string[];
  isImageSelectorOpen: boolean = false;

  editBlogPostsSubscription: Subscription | undefined;
  getCategoriesSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private blogPostService: BlogService,
    private imageService: ImageServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        localStorage.setItem('getBlogId', `${params.get('id')}`)

        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (res) => {
              this.model = res;
              this.selecteCategories = res.categories.map(x => x.id);
            },
          });
        }
      },
      error: (err) => {},
    });

      this.imageSelectSubscription = this.imageService.onImageSelection()
        .subscribe({
          next: (res) =>{

          if(this.model){
            this.model.featuredImageUrl = res.url;
            this.isImageSelectorOpen = false;
          }
        }
      });
  }

  onFormSubmit() {
    if (this.model && this.id) {
      const updateBlog: UpdateBlogPostRequest = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        urlHandle: this.model.urlHandle,
        publishedDate: this.model.publishedDate,
        author: this.model.author,
        isVisible: this.model.isVisible,
        categories: this.model.categories,
      };

      if (this.id) {
        this.deleteBlogPostSubscription = this.blogPostService
          .updateBlogPost(this.id, updateBlog)
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/admin/blog-post');
              console.log(`updated`);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    }
  }

  onDelete(){
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (param) => {

        this.id = param.get('id');

        if(this.id){

          this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
              .subscribe({
                next:(res)=>{
                  this.router.navigateByUrl('/admin/blog-post');
                }
              });
        }
      }
    });
  }

  openImageSelector(): void{
    this.isImageSelectorOpen = true

  }

  onCancel(): void{
    this.isImageSelectorOpen = false;
  }

  ngOnDestroy(): void {
    this.editBlogPostsSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe;
    this.routeSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
