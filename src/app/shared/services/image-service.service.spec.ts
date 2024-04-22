import { TestBed } from '@angular/core/testing';

import { ImageServiceService } from './image-service.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImageServiceService', () => {
  let service: ImageServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ImageServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
