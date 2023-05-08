import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { SaleComponent } from './sale/sale.component';
import { CategoryComponent } from './category/category.component';
import { DiscountComponent } from './discount/discount.component';
import { FAndDComponent } from './f-and-d/f-and-d.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MentorComponent } from './mentor/mentor.component';
import { ServicesComponent } from './services/services.component';
import { SlideComponent } from './slide/slide.component';
import { TopsaleComponent } from './topsale/topsale.component';
import { CollectionManorWomanComponent } from './collection-manor-woman/collection-manor-woman.component';
import { Collection4SeasonsComponent } from './collection4-seasons/collection4-seasons.component';
import { CollectionAccesoryComponent } from './collection-accesory/collection-accesory.component';
import { CollectionHolydayComponent } from './collection-holyday/collection-holyday.component';
import { CollectionManComponent } from './collection-man/collection-man.component';
import { CollectionShoeComponent } from './collection-shoe/collection-shoe.component';
import { CollectionWomanComponent } from './collection-woman/collection-woman.component';
import { HomeRoutingModule } from './home-routing';
import { QuestionComponent } from './question/question.component';
import { BAndFComponent } from './b-and-f/b-and-f.component';




@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      NgbModule,
      NouisliderModule,
      RouterModule,
      JwBootstrapSwitchNg2Module,
      BrowserModule,
      AppRoutingModule,
      HomeRoutingModule

  ],
  declarations: [
     HomeComponent,
     SaleComponent,
     CategoryComponent,
     DiscountComponent,
     FAndDComponent,
     HeaderComponent,
     LoginComponent,
     MentorComponent,
     QuestionComponent,
     ServicesComponent,
     SlideComponent,
     TopsaleComponent,
     CollectionManorWomanComponent,
     Collection4SeasonsComponent,
     CollectionAccesoryComponent,
     CollectionHolydayComponent,
     CollectionManComponent,
     CollectionShoeComponent,
     CollectionWomanComponent,
     BAndFComponent,
   ],
  exports:[ HomeComponent ]
})
export class HomeModule {}
