import { async } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(async(() => {
    localStorageService = new LocalStorageService();
  }));

  it('should create', () => {
    expect(localStorageService).toBeDefined();
  });

  it('should get items list if available', () => {
    spyOn(window.localStorage, 'getItem').and.callFake(() => {return '[{}, {}]'});
    expect(localStorageService.getItems('mockName').length).toBe(2);
  });

  it('should get items', () => {
    spyOn(window.localStorage, 'getItem').and.callFake(() => {return });
    expect(localStorageService.getItems('mockName').length).toBe(0);
  });

  it('should set items', () => {
    spyOn(window.localStorage, 'setItem').and.callFake(() => {return });
    localStorageService.setItems('mockName', [{}, {}]);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should remove item', () => {
    localStorageService.removeItem(1);
    localStorageService.item$.subscribe(res => {
      expect(res).toBe(true);
    });
  });

  it('should refresh list', () => {
    localStorageService.refreshList();
    localStorageService.newItemAdded$.subscribe(res => {
      expect(res).toBe(true);
    });
  });
});
