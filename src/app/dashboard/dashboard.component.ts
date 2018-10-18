import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'file-uploader',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input()
  activeColor = 'green';
  @Input()
  baseColor = '#ccc';
  @Input()
  overlayColor = 'rgba(255,255,255,0.5)';

  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageSrc = '';
  images = [];
  zoomedImage: {};
  zoomedImageSrc = '';

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      const pattern = /image-*/;
      const reader = new FileReader();

      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }

      this.loaded = false;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }

  saveImage() {
    if (this.loaded) {
      let imagesList = [];
      this.images = this.localStorageService.getItems('imagesList');
      if (this.images.length > 0) {
        imagesList = this.images;
      }
      imagesList.push({ src: this.imageSrc, createdOn: new Date().toLocaleDateString() });
      this.localStorageService.setItems('imagesList', imagesList);
      this.localStorageService.refreshList();
      this.imageSrc = '';
    }
  }
}
