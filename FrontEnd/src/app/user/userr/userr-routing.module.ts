import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserGuardsComponent } from './components/user-guards/user-guards.component';
import { UserFixComponent } from './components/user-fix/user-fix.component';

const routes: Routes = [
  {path:'',component:UserDashboardComponent,children:[
  {path:'guards', component:UserGuardsComponent},
  {path:'fix/:id', component:UserFixComponent},
  {path: '', redirectTo: '/user/guards', pathMatch: 'full'}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrRoutingModule { }
