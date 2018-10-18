import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotFoundService } from './services/not-found.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { LocalStorageService } from './services/local-storage.service';
import { PagerService } from './services/pager.service'

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    ImagesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [NotFoundService, LocalStorageService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
