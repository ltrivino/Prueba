import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Citas } from 'src/app/models/citas.model';
import { CitasService } from 'src/app/services/citas.service';
import { MascotasService } from 'src/app/services/mascotas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  citas: Citas[] = [];
  dataSource: MatTableDataSource<Citas>;

  descripcion: string | null = ""
  imagen: string | null = ""
  detalle: string | null = ""
  mascotaId: number | 0 = 0
  precio: number | 0 = 0
  estado: boolean | false = false

  selecteMascota: any;

  form: FormGroup;

  displayedColumns: string[] = [
    'id',
    'detalle',
    'imagen',
    'descripcion',
    'precio',
    'mascotaId',
    'estado',
    'Action'
  ];
  datosMascotas: any;

  constructor(private fb: FormBuilder,
    private mascotaServices: MascotasService,
    private citasServices: CitasService) {
    this.dataSource = new MatTableDataSource(this.citas);
    this.form = this.fb.group({
      detalle: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      mascotaId: ['', Validators.required],
      estado: [''],
    });
  }

  ngOnInit(): void {
    this.GetAllCitas();
    this.GetAllMascotas();
  }


  GetAllCitas() {
    this.citasServices.getAll().subscribe((resp) => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp)
    }, error => {
      alert(error)
    });

  }

  GetAllMascotas() {
    this.mascotaServices.getAll().subscribe((resp) => {
      console.log(resp)
      this.datosMascotas = resp;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GuardarDatos() {

    /*     if (this.form.invalid) {
          return;
        } */

    const citas: Citas = {
      descripcion: this.form.value.descripcion,
      imagen: this.form.value.imagen,
      precio: this.form.value.precio,
      detalle: this.form.value.detalle,
      mascotaId: parseInt(this.selecteMascota),
      estado: true
    }

    console.log(citas);


    this.citasServices.create(citas).subscribe((resp: any) => {
      this.GetAllCitas();
    }, error => {
      alert(error.m)
    });

  }

  ConfirmarDelete(id: number) {
    Swal.fire({
      title: '<h3>Esta seguro que desea eliminar la Cita?</h3>',
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
    this.citasServices.delete(id).subscribe((resp) => {
      this.ngOnInit();
    }, error => {
      alert(error)
    });
  }

}
