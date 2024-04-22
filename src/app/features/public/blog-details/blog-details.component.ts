import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../blog-posts/services/blog.service';
import { GetBlogPostRequest } from '../../blog-posts/models/get-blogs-request.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {

  url: string | null = null;
  blogDetails$?: Observable<GetBlogPostRequest>;

  urlSubscription? : Subscription;
  blogDetailsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogService
  ){}

  ngOnInit(): void {
    this.urlSubscription = this.route.paramMap
      .subscribe({
        next: (params) =>{
          this.url = params.get('url');
        }
      });

    if(this.url){
      this.blogDetails$ = this.blogPostService.getBlogPostByUrl(this.url)
    }
  }

  ngOnDestroy(): void {
      this.urlSubscription?.unsubscribe();
  }
}
