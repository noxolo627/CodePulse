import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture:  ComponentFixture<CategoryListComponent>;

  beforeEach(()=>{

    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    });

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', ()=> {
    expect(component).toBeTruthy();
  });
});

