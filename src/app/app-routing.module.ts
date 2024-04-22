import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { AddCategoryComponent } from './features/categories/add-category/add-category.component';
import { EditCategoriesComponent } from './features/categories/edit-categories/edit-categories.component';
import { BlockpostListComponent } from './features/blog-posts/blockpost-list/blockpost-list.component';
import { AddBlogPostComponent } from './features/blog-posts/add-blog-post/add-blog-post.component';
import { EditBlogPostsComponent } from './features/blog-posts/edit-blog-posts/edit-blog-posts.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuardGuard } from './features/auth/auth-guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'admin/categories/add',
    component:AddCategoryComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'admin/categories',
    component:CategoryListComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'admin/categories/:id',
    component:EditCategoriesComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'admin/blog-post',
    component:BlockpostListComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'admin/blog-post/add',
    component:AddBlogPostComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'admin/blog-post/:id',
    component:EditBlogPostsComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: '',
    component:HomeComponent,
    
  },
  {
    path: 'blog-post/:url',
    component: BlogDetailsComponent,
  },
  {
    path: 'login',
    component:LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
