import { async } from '@angular/core/testing';
import { PagerService } from './pager.service';

describe('PagerService', () => {
  let pagerService: PagerService;

  beforeEach(async(() => {
    pagerService = new PagerService();
  }));

  it('should create', () => {
    expect(pagerService).toBeDefined();
  });

  it('should return pager', () => {
    expect(pagerService.getPager(10)).toEqual(
      {
        totalItems: 10,
        currentPage: 1,
        pageSize: 8,
        totalPages: 2,
        startPage: 1,
        endPage: 2,
        startIndex: 0,
        endIndex: 7,
        pages: [1, 2]
      }
    );
  });
});
