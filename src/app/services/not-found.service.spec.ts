import { async } from '@angular/core/testing';
import { NotFoundService } from './not-found.service';

describe('NotFoundService', () => {
  let notFoundService: NotFoundService;

  beforeEach(async(() => {
    notFoundService = new NotFoundService();
  }));

  it('should create', () => {
    expect(notFoundService).toBeDefined();
  });

  it('should emit the event', () => {
    notFoundService.emit(true);
    notFoundService.notFound$.subscribe(res => {
      expect(res).toBe(true);
    })
  });
});
