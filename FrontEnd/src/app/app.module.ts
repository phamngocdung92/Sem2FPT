import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';

import { CompareComponent } from './compare/compare.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { HomeModule } from './home/home.modules';
import { Check1Component } from './home/check1/check1.component';
import { Check2Component } from './home/check2/check2.component';
import { Check3Component } from './home/check3/check3.component';
import { Check4Component } from './home/check4/check4.component';
import { Check5Component } from './home/check5/check5.component';
import { Check6Component } from './home/check6/check6.component';
import { Check7Component } from './home/check7/check7.component';
import { Check8Component } from './home/check8/check8.component';
import { ToastrModule } from 'ngx-toastr';
import {  BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChatComponent } from './shared/chat/chat.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './home/login-admin/login-admin.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginadminComponent } from './shared/loginadmin/loginadmin.component';
import { StickyInforDirective } from './compare/sticky-infor.directive';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';












@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AppComponent,
    CartComponent,
    CompareComponent,
    DetailComponent,
    SearchComponent,
    Check1Component,
    Check2Component,
    Check3Component,
    Check4Component,
    Check5Component,
    Check6Component,
    Check7Component,
    Check8Component,
    ChatComponent,
    PageNotFoundComponent,
    
    RegisterComponent,
    LoginAdminComponent,
    LoginadminComponent,
    StickyInforDirective,
    NextDirective,
    PrevDirective
    
    







  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    HttpClientModule,
    HomeModule,
    NgbCarouselModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
