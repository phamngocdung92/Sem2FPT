import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './detail/detail.component';
import { BalenciagaComponent } from './examples/balenciaga/balenciaga.component';


import { HomeComponent } from './home/home.component';
import { SlideComponent } from './home/slide/slide.component';
import { TopsaleComponent } from './home/topsale/topsale.component';
import { CompareComponent } from './compare/compare.component';
import { BAndFComponent } from './home/b-and-f/b-and-f.component';
import { CategoryComponent } from './home/category/category.component';
import { DiscountComponent } from './home/discount/discount.component';
import { FAndDComponent } from './home/f-and-d/f-and-d.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './home/login/login.component';
import { MentorComponent } from './home/mentor/mentor.component';
import { ServicesComponent } from './home/services/services.component';
import { Check1Component } from './home/check1/check1.component';
import { Check2Component } from './home/check2/check2.component';
import { Check3Component } from './home/check3/check3.component';
import { Check4Component } from './home/check4/check4.component';
import { Check5Component } from './home/check5/check5.component';
import { Check6Component } from './home/check6/check6.component';
import { Check7Component } from './home/check7/check7.component';
import { Check8Component } from './home/check8/check8.component';
import { QuestionComponent } from './home/question/question.component';





const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch: 'full'},
  { path: 'home' , component: HomeComponent },
  { path: 'compare' , component: CompareComponent},
  { path: 'bandf', component: BAndFComponent},
  { path: 'categogy', component: CategoryComponent},
  { path: 'discount', component: DiscountComponent},
  { path: 'fandd', component: FAndDComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mentor', component: MentorComponent},
  { path: 'motification', component: Notification},
  { path: 'question', component: QuestionComponent},
  { path: 'services', component: ServicesComponent},
  {path: 'slide', component: SlideComponent},
  { path: 'My+Acc', component: TopsaleComponent},
  { path: 'cart', component: CartComponent},
  { path: 'detail', component: DetailComponent},
  { path: 'balenciaga', component: BalenciagaComponent},
  { path: 'check1' , component: Check1Component},
  { path: 'check2' , component: Check2Component },
  { path: 'check3' , component: Check3Component},
  { path: 'a+d+m+i+n' , component: Check4Component},
  { path: 'so+do+web' , component: Check5Component},
  { path: 'phap+li+va+bao+mat' , component: Check6Component},
  { path: 'check7' , component: Check7Component},
  { path: 'check8' , component: Check8Component},

];



@NgModule({

  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    HttpClientModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
