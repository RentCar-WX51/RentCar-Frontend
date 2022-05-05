import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CarsComponent} from "./cars/pages/cars/cars.component";
import {AboutComponent} from "./public/about/about.component";
import {HomeComponent} from "./public/home/home.component";
import {ArrendadorComponent} from "./arrendadores/pages/arrendadores/arrendador/arrendador.component"

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: 'cars', pathMatch: 'full'},
  { path: 'cars', component: CarsComponent },
  { path: 'arrendadores', component: ArrendadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
