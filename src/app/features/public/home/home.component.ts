import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog-posts/services/blog.service';
import { Observable } from 'rxjs';
import { GetBlogPostRequest } from '../../blog-posts/models/get-blogs-request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<GetBlogPostRequest[]>

  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.blogs$ = this.blogService.getAllBlogPosts();
  }

}
