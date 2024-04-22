import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
import {
  HttpTestingController,
  HttpClientTestingModule
 } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscriber } from 'rxjs';
import { GetBlogPostRequest } from '../models/get-blogs-request.model';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { model } from '@angular/core';

describe('BlogService', () => {
  let service: BlogService;
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController;
  let blogId: any;
  let testBlogs: GetBlogPostRequest [] = [];
  let blogReqBody: AddBlogPostRequest [] =[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule]
    });

    //injecting the httpService and test controller for each test
    service = TestBed.inject(BlogService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //begin your tests
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test HttpClient.get', ()=> {

    //make an htt GET request

    httpClient.get<Data>(`${environment.apiBaseUrl}/api/blogposts`)
      .subscribe(blogs => {
        //when the observable resolves, result should match test data
        expect(blogs).toEqual(testBlogs);
      });

    /*
    The expectOne will match the request's URL,
    if no requests or multiple requests matches the URL,
    Then the expectOne will throw an exception
    */
    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/blogposts`);

    //assert that the request is a GET
    expect(req.request.method).toEqual('GET');

    /*
      Respond with mock data, causing observable to resolve.
      subscribe to callback assert that the correct data was returned
    */
    req.flush(testBlogs);
  });

  it('can test HttpClient.Post',()=>{
    //make an HttpPost request
    httpClient.post<Data>(`${environment.apiBaseUrl}/api/blogposts`, blogReqBody )
      .subscribe((blogReqBodyResponse)=>{
        expect(blogReqBodyResponse).toEqual(blogReqBody);
      });

      const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/blogposts`);

      expect(req.request.method).toEqual('POST')

      req.flush(blogReqBody);
  });
  it('can test HttpClient.Put');

  it('can test HttpClient.Delete');

  it('can test HttpClient.Get by Id', ()=> {

    blogId = localStorage.getItem('getBlogId');

    httpClient.get<Data>(`${environment.apiBaseUrl}/api/blogposts/${blogId}`)
      .subscribe(blog => {
        expect(blog).toEqual(testBlogs);
      });

      const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/blogposts/${blogId}`);

      expect(req.request.method).toBe('GET');

      req.flush(testBlogs);
  });

  afterEach(()=>{
    //assert that there are no outstanding requests
    httpTestingController.verify();
    localStorage.clear();
  })
});
