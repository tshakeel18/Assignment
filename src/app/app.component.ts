import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotFoundService } from './services/not-found.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Assignment';
  subscription: Subscription;
  isNotFound = false;

  constructor(private nfService: NotFoundService) {}

  ngOnInit() {
    this.subscription = this.nfService.notFound$.subscribe(isNotFound => this.isNotFound = isNotFound)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
