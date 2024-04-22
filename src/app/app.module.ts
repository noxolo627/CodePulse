import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AddCategoryComponent } from './features/categories/add-category/add-category.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EditCategoriesComponent } from './features/categories/edit-categories/edit-categories.component';
import { BlockpostListComponent } from './features/blog-posts/blockpost-list/blockpost-list.component';
import { AddBlogPostComponent } from './features/blog-posts/add-blog-post/add-blog-post.component';
import { EditBlogPostsComponent } from './features/blog-posts/edit-blog-posts/edit-blog-posts.component';
import { RouterModule } from '@angular/router';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { MarkdownModule } from 'ngx-markdown';
import { AuthInterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    CategoryListComponent,
    EditCategoriesComponent,
    BlockpostListComponent,
    AddBlogPostComponent,
    EditBlogPostsComponent,
    NavbarComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MarkdownModule.forRoot()
  ],
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
