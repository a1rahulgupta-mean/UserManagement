import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { UserListComponent } from './components/User Management/user-list/user-list.component';


// Parent Routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: homeChildRoutes
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
