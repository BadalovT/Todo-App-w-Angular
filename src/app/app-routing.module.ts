import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {NotfoundComponent} from './components/notfound/notfound.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'about', component: AboutComponent,
  },
  {
    path: '**' , component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
