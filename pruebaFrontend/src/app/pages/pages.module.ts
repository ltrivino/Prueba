import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CitasComponent } from './citas/citas.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MascotaComponent } from './mascotas/mascota/mascota.component';
import { NameMascotaPipe } from '../pipes/name-mascota.pipe';
import { CitaComponent } from './citas/cita/cita.component';

@NgModule({
  declarations: [
    CitasComponent,
    MascotasComponent,
    MascotaComponent,
    NameMascotaPipe,
    CitaComponent
    
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
  ]
})
export class PagesModule { }
