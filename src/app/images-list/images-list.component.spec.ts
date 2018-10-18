import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ImagesListComponent } from './images-list.component';
import { LocalStorageService } from '../services/local-storage.service';
import { PagerService } from '../services/pager.service';
import { Observable } from 'rxjs/Rx';

describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;
  let el;

  const mockService = {
    getItems: () => { return [{}, {}] },
    setItems: () => { },
    removeItem: () => { },
    refreshList: () => { },
    item$: {
      subscribe: (cb) => {
        cb()
      }
    },
    newItemAdded$: {
      subscribe: (cb) => {
        cb()
      }
    }
  }

  class MockModalService {
    open() { return { close: () => { } } }
  }

  const mockPagerService = {
    setPage: () => { },
    getPager: () => {
      return {
        totalPages: 1,
        startIndex: 0,
        endIndex: 1
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesListComponent],
      providers: [
        { provide: PagerService, useValue: mockPagerService },
        { provide: LocalStorageService, useValue: mockService },
        { provide: NgbModal, useClass: MockModalService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.pagedImages.length).toBe(2);
  });

  it('should open modal', () => {
    spyOn(component, 'openModal').and.callThrough();
    const imagesEl = document.querySelectorAll('.col-3');
    imagesEl[0].dispatchEvent(new Event('click'));
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should open modal and delete image', () => {
    spyOn(component, 'openModal').and.callThrough();
    const imagesEl = document.querySelectorAll('.col-3');
    imagesEl[0].dispatchEvent(new Event('click'));
    expect(component.openModal).toHaveBeenCalled();

    spyOn(component.modalRef, 'close').and.callThrough();
    component.deleteImage();
    expect(component.modalRef.close).toHaveBeenCalled();
  });
});
