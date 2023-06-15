import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserrRoutingModule } from './userr-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserGuardsComponent } from './components/user-guards/user-guards.component';
import { UserFixComponent } from './components/user-fix/user-fix.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserGuardsComponent,
    UserFixComponent
  ],
  imports: [
    CommonModule,
    UserrRoutingModule,
    NgbModule,
    FormsModule,
  ]
})
export class UserrModule { }
