import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let httpClientTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[NavbarComponent],
      imports: [ HttpClientTestingModule, RouterModule.forRoot([])]
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    httpClientTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
