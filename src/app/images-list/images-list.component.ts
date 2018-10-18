import { Component, ChangeDetectionStrategy, TemplateRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../services/pager.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesListComponent implements OnInit {

  images = [];
  zoomedImage: {};
  pagedImages: any[];
  zoomedImageSrc = '';
  pager: any = {};
  pagedItems: any[];
  focusedImageIndex: number;
  createdDate: any;

  public modalRef: NgbModalRef;

  constructor(
    private localStorage: LocalStorageService,
    private modalService: NgbModal,
    private pagerService: PagerService,
    private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateListOnDelete();
    this.refreshList();
    this.getImagesList();
  }

  updateListOnDelete() {
    this.localStorage.item$.subscribe(result => {
      if (this.images.length > 0) {
        const newList = this.images.filter(function (value, index) {
          return index !== result;
        });
        this.localStorage.setItems('imagesList', newList);
        this.getImagesList();
      }
    });
  }

  refreshList() {
    this.localStorage.newItemAdded$.subscribe(() => {
      this.getImagesList();
    });
  }

  getImagesList() {
    this.images = this.localStorage.getItems('imagesList');
    this.setPage(1);
    this.cdRef.detectChanges();
  }

  public openModal(template: TemplateRef<any>, image, index) {
    this.zoomedImage = image;
    this.zoomedImageSrc = image.src;
    this.focusedImageIndex = index;
    this.createdDate = image.createdOn;
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  deleteImage() {
    this.localStorage.removeItem(this.focusedImageIndex);
    this.modalRef.close();
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.images.length, page);
    if (page < 1 || page > this.pager.totalPages && this.pager.totalPages > 0) {
      return;
    }
    this.pagedImages = this.images.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
