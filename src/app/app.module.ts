import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UpdateComponent } from './zonas/update/update.component';
import { PrincipalComponent } from './zonas/principal/principal.component';
import { InsertComponent } from './zonas/insert/insert.component';
import { HeaderComponent } from './zonas/header/header.component';
import { DevolucionComponent } from './zonas/devolucion/devolucion.component';
import { AlquilerComponent } from './zonas/alquiler/alquiler.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    PrincipalComponent,
    InsertComponent,
    HeaderComponent,
    DevolucionComponent,
    AlquilerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule, 
    RouterModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
