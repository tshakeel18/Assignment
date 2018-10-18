import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LocalStorageService {
  item$ = new Subject<any>();
  newItemAdded$ =  new Subject<Boolean>();

  getItems(itemName) {
    if (localStorage.getItem(itemName)) {
      return JSON.parse(localStorage.getItem('imagesList'));
    } else  {
      return [];
    }
  }

  setItems (itemName, list) {
    localStorage.setItem(itemName, JSON.stringify(list));
  }

  removeItem(value: number) {
    this.item$.next(value);
  }

  refreshList() {
    this.newItemAdded$.next(true);
  }
}
