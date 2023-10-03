import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from '../../models/mascotas.model';
import { MascotasService } from 'src/app/services/mascotas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {

  form: FormGroup;
  mascotas: Mascota[] = [];

  dataSource: MatTableDataSource<Mascota>;

  nombre: string | null = ""
  imagen: string | null = ""
  nombreProp: string | null = ""
  raza: string | null = ""

  pageSize = 5;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'imagen',
    'nombreProp',
    'raza',
    'Action'
  ];

  constructor(private fb: FormBuilder, private mascotasServices: MascotasService) {
    this.dataSource = new MatTableDataSource(this.mascotas);
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],
      nombreProp: ['', Validators.required],
      raza: ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.GetAllMascotas();
  }

  GetAllMascotas() {
    this.mascotasServices.getAll().subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp)
    }, error => {
      alert(error)
    });
  }

  GuardarDatos() {

    if (this.form.invalid) {
      return;
    }

    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      imagen: this.form.value.imagen,
      nombreProp: this.form.value.nombreProp,
      raza: this.form.value.raza,
    }

    this.mascotasServices.create(mascota).subscribe((resp: any) => {
      this.GetAllMascotas();
    }, error => {
      alert(error.m)
    });

  }


  ConfirmarDelete(id: number) {
    Swal.fire({
      title: '<h3>Esta seguro que desea eliminar la mascota?</h3>',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#48BAB9',
      denyButtonColor: '#F4991F',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRegistro(id);
        this.ngOnInit();
      } else if (result.isDenied) {
        this.ngOnInit();
      }
    });
  }

  deleteRegistro(id: number) {
    this.mascotasServices.delete(id).subscribe((resp) => {
      this.ngOnInit();
    }, error => {
      alert(error)
    });
  }

}
