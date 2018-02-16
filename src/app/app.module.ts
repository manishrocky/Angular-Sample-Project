import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TableDemoComponent } from './table-data/table-demo';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { Ng2TableModule } from './components/ng-table-module';


@NgModule({
  declarations: [
    TableDemoComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
