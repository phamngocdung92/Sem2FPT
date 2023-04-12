import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExamplesModule } from './examples/examples.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CommonComponent } from './common/common.component';
import { CompareComponent } from './compare/compare.component';

import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { ComponentsModule } from './components/components.modules';
import {NavbarComponent} from './shared/navbar/navbar.component'



@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CommonComponent,
    CompareComponent,
    DetailComponent,
    SearchComponent,
    NavbarComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ExamplesModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ComponentsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
