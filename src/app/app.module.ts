import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";

import { AppComponent } from './app.component';
import { AboutComponent } from './public/about/about.component';
import { HomeComponent } from './public/home/home.component';
import { CarsComponent } from './cars/pages/cars/cars.component';

import {CarsService} from "./cars/services/cars.service";
import {PreciosComponent} from "./precios/pages/precios/precios.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    CarsComponent,
    PreciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule
  ],
  providers: [CarsService, PreciosComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
