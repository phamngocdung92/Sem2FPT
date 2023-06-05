import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminMentorComponent } from './components/admin-mentor/admin-mentor.component';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { FixComponent } from './components/fix/fix.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminMentorComponent,
    AdminComponent,
    FixComponent


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    NgbCollapseModule

  ]
})
export class AdminModule { }
