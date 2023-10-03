import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Citas } from 'src/app/models/citas.model';
import { CitasService } from 'src/app/services/citas.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  citas: Citas | null = null;


  selecteMascota: any;

  form: FormGroup;

  descripcion: string | null = ""
  imagen: string | null = ""
  detalle: string | null = ""
  mascotaId: number | 0 = 0
  precio: number | 0 = 0
  estado: boolean | false = false
  id: number | 0 = 0;
  datosMascotas: any;


  constructor(private fb: FormBuilder,
    private mascotaServices: MascotasService,
    private citasServices: CitasService,
    private router : Router,
    private activateRouter: ActivatedRoute) {
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
    this.activateRouter.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getCitaById(this.id)
      this.GetAllMascotas();
    })
  }

  GetAllMascotas() {
    this.mascotaServices.getAll().subscribe((resp) => {
      console.log(resp)
      this.datosMascotas = resp;
    });
  }

  getCitaById(id: number) {
    this.citasServices.getById(id).subscribe(resp => {
      this.citas = resp
      this.detalle = this.citas.detalle
      this.imagen = this.citas.imagen
      this.descripcion = this.citas.descripcion
      this.precio = this.citas.precio
    })
  }

  GuardarDatos(){
  }

}
