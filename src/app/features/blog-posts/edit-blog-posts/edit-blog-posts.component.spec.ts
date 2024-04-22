import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogPostsComponent } from './edit-blog-posts.component';
import { CategoryService } from '../../categories/services/category.service';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { authGuardGuard } from '../../auth/auth-guards/auth-guard.guard';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditBlogPostsComponent', () => {
  let component: EditBlogPostsComponent;
  let fixture: ComponentFixture<EditBlogPostsComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBlogPostsComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        provideRouter([{
          path: 'admin/blog-post/:id',
          component:EditBlogPostsComponent,
          canActivate: [authGuardGuard]
        }])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditBlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
