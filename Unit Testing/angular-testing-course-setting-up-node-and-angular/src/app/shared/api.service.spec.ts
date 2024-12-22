import { TestBed } from '@angular/core/testing';
import { ApiService, TagInterface } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(apiService).toBeTruthy();
  });

  describe('getTags', () => {
    it('should return a list of tags', () => {
      let tags: TagInterface[] | undefined;
      apiService.getTags().subscribe((response) => {
        tags = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush([{ id: '1', name: 'foo' }]);
      expect(tags).toEqual([{ id: '1', name: 'foo' }]);
    });
  });

  describe('createTag', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined;
      apiService.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({ id: '1', name: 'foo' });
      expect(tag).toEqual({ id: '1', name: 'foo' });
    });
  });

  it('should throw an error if failed', () => {
    let actualError: HttpErrorResponse | undefined;
    apiService.createTag('foo').subscribe({
      next: () => {
        fail('success should not be called');
      },
      error(err) {
        actualError = err;
      },
    });
    const req = httpTestingController.expectOne('http://localhost:3004/tags');
    req.flush('Server Error', {
      status: 402,
      statusText: 'Unprocessable Entity',
    });

    expect(actualError?.status).toEqual(402);
    expect(actualError?.statusText).toEqual('Unprocessable Entity');
  });
});
