import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogPostComponent } from './add-blog-post.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ImageSelectorComponent } from 'src/app/shared/components/image-selector/image-selector.component';

describe('AddBlogPostComponent', () => {
  let component: AddBlogPostComponent;
  let fixture: ComponentFixture<AddBlogPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBlogPostComponent, ImageSelectorComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MarkdownModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(AddBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
