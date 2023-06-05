import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';


@NgModule({
  declarations: [
    UserDasboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
