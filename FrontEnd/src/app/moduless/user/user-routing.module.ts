import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';

const routes: Routes = [{path:'', component: UserDasboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
