import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoryService } from './category.service';
import { Component } from '@angular/core';
import { GetCategoryRequest } from '../models/get-category-request.models';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let categoryId: any;
  const testCategories: GetCategoryRequest[]=[];
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should create', ()=> {
    expect(Component).toBeTruthy();
  })

  it('can test HttpClient.get', () => {

    httpClient.get<Data>(`${environment.apiBaseUrl}/api/categories`)
      .subscribe( categories => {
        expect(categories).toEqual(testCategories);
      });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/categories`);

    expect(req.request.method).toEqual('GET');

    req.flush(testCategories);

    httpTestingController.verify();
  });

  it('can test HttpClient.Post');
  it('can test HttpClient.Put');
  it('can test HttpClient.Delete');

  it('can test HttpClient.Get by Id', ()=>{
    categoryId = localStorage.getItem('getCategoryId');

    httpClient.get<Data>(`${environment.apiBaseUrl}/api/categories/${categoryId}`)
      .subscribe(category => {
        expect(category).toEqual(testCategories);
      });

      const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/categories/${categoryId}`);

      expect(req.request.method).toEqual('GET');

      req.flush(testCategories);
  });

  afterEach(()=> {
    httpTestingController.verify();
    localStorage.clear();
  });
});
