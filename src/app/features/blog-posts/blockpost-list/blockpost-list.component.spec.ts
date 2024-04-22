import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockpostListComponent } from './blockpost-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';


describe('BlockpostListComponent', () => {
  let component: BlockpostListComponent;
  let fixture: ComponentFixture<BlockpostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockpostListComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
    });
    fixture = TestBed.createComponent(BlockpostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display title ', ()=>{
    const blogPostListComponent: HTMLElement = fixture.nativeElement;
    const h1 = blogPostListComponent.querySelector('h1');

    expect(h1?.textContent).toEqual('Blog Posts List')
  });
});
