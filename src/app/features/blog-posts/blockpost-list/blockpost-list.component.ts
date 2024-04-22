import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../services/blog.service';
import { GetBlogPostRequest } from '../models/get-blogs-request.model';

@Component({
  selector: 'app-blockpost-list',
  templateUrl: './blockpost-list.component.html',
  styleUrls: ['./blockpost-list.component.css']
})
export class BlockpostListComponent implements OnInit{
  blogPosts?: Observable<GetBlogPostRequest[]>;

  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.blogPosts = this.blogService.getAllBlogPosts();
  }
}
