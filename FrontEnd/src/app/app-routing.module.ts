import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import {CommonComponent} from './common/common.component';

const routes: Routes = [
  {path: 'cartPage', component: CartComponent},
  {path: 'commonPage', component: CommonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
