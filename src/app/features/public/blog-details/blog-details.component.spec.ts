import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogDetailsComponent } from './blog-details.component';
import { RouterModule, provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogDetailsComponent],
      imports: [RouterModule, HttpClientTestingModule],
      providers: [
        provideRouter([{
          path: 'blog-post/:url',
          component: BlogDetailsComponent,
        }])
      ]
    });
    fixture = TestBed.createComponent(BlogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
