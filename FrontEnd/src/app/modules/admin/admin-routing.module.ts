import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminMentorComponent } from './components/admin-mentor/admin-mentor.component';
import { FixComponent } from './components/fix/fix.component';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent,children:[
  {path:'mentor', component:AdminMentorComponent},
  {path:'fix/:id', component:FixComponent},
  {path: 'home', redirectTo: '/admin/mentor', pathMatch: 'full'}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
