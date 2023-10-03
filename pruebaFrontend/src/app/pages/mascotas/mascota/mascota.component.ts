import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascotas.model';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {

  form: FormGroup;
  id: any;

  nombre: string | null = null
  imagen: string | null = null
  nombreProp: string | null = null
  raza: string | null = null

  mascota: Mascota | null = null

  constructor(private fb: FormBuilder, private activateRouter: ActivatedRoute, 
    private mascotaService: MascotasService,
    private router : Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],
      nombreProp: ['', Validators.required],
      raza: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getMascotaById(this.id)
    })

  }

  getMascotaById(id: number) {
    this.mascotaService.getById(id).subscribe(resp => {
      this.mascota = resp
      this.nombre = this.mascota.nombre
      this.imagen = this.mascota.imagen
      this.nombreProp = this.mascota.nombreProp
      this.raza = this.mascota.raza
    })
  }

  UpdateDatos(){
    if (this.form.invalid) {
      return;
    }

    const mascota: Mascota = {
      nombre : this.form.value.nombre,
      imagen : this.form.value.imagen,
      nombreProp : this.form.value.nombreProp,
      raza : this.form.value.raza,
    }
    this.mascotaService.Update(mascota, this.id).subscribe(resp => {
      this.router.navigateByUrl('/mascotas');
    })
  }

}
