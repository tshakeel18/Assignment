import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { LocalStorageService } from '../services/local-storage.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const mockService = {
    getItems: () => { return [{}, {}] },
    setItems: () => { },
    refreshList: () => { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: LocalStorageService, useValue: mockService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the file loaded', () => {
    const mockEvent = {
      target: {
        result: {}
      }
    }
    component._handleReaderLoaded(mockEvent);
    expect(component.loaded).toBe(true);
  });

  it('should save images', () => {
    component.loaded = true;
    component.saveImage();
    expect(component.images.length).toBe(3);
    expect(component.imageSrc).toBe('');
  });

  it('should handle drop event', () => {
    const mockEvent = { preventDefault: () => { } };
    const spy = spyOn(component, 'handleInputChange').and.callFake(() => { });
    component.handleDrop(mockEvent);
    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it('should handle drage leave', () => {
    component.handleDragLeave();
    expect(component.dragging).toBe(false);
  });

  it('should handle drage enter event', () => {
    component.handleDragEnter();
    expect(component.dragging).toBe(true);
  });
});
