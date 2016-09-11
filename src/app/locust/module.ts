import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './routing';

import { LocustComponent } from './component';
import { IssuesModule } from '../issues/module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    IssuesModule
  ],
  declarations: [
    LocustComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ LocustComponent ]
})
export class LocustModule {}
