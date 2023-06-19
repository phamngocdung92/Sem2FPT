import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { Check1Component } from './check1/check1.component';
import { Check2Component } from './check2/check2.component';
import { watchmoreComponent } from './watchmore/watchmore.component';


const routes: Routes = [
  { path: 'check1' , component: Check1Component}, //seasons
  { path: 'check2' , component: Check2Component},
  { path: 'watchmore', component: watchmoreComponent}

];

@NgModule({

  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BrowserModule,
    HttpClientModule
    ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
