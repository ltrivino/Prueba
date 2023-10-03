import { Pipe, PipeTransform } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';

@Pipe({
  name: 'nameMascota'
})
export class NameMascotaPipe implements PipeTransform {

  constructor(private mascotaService: MascotasService) {

  }


  transform(id: number): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {

      this.mascotaService.getAll().subscribe(resp => {
        if (resp) {
          let mascotas = resp;
          for (let index = 0; index < mascotas.length; index++) {
            if (mascotas[index].id == id) {
           /*    console.log("zone restaurante ", restaurant[index].id, "id ", id); */
              resolve(mascotas[index].nombre)
            }
          }
        }
      })
    })
    return promise
  }

}
