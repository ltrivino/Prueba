import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { CitaComponent } from './citas/cita/cita.component';
import { CitasComponent } from './citas/citas.component';
import { MascotaComponent } from './mascotas/mascota/mascota.component';
import { MascotasComponent } from './mascotas/mascotas.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/citas',
        pathMatch: 'full'
      },
      {
        path: 'citas',
        component: CitasComponent
      },
      {
        path: 'cita/:id',
        component: CitaComponent
      },
      {
        path: 'mascotas',
        component: MascotasComponent
      },
      {
        path: 'mascota/:id',
        component: MascotaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
