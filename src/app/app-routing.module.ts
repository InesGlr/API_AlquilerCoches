import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './zonas/principal/principal.component';
import { InsertComponent } from './zonas/insert/insert.component';
import { UpdateComponent } from './zonas/update/update.component';
import { AlquilerComponent } from './zonas/alquiler/alquiler.component';
import { DevolucionComponent } from './zonas/devolucion/devolucion.component';

const routes: Routes = [
  {path:'',component: PrincipalComponent, title: 'Pagina principal' },
  {path:'insert',component: InsertComponent, title: 'Añadir coche' },
  {path:'update/:id',component: UpdateComponent, title: 'actualizar coche' },
  {path:'alquiler/:id',component: AlquilerComponent, title: 'Alquiler de coche' },
  {path:'devolucion/:id',component: DevolucionComponent, title: 'Devolucion de coche' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
