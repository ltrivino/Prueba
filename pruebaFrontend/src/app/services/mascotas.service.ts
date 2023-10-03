import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../models/mascotas.model';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private apiUrl = `${environment.API_URL}/api/mascota`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Mascota[]>(`${this.apiUrl}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.BadRequest) {
            return throwError(() => 'Nombre ya existe');
          }
          return throwError(() => 'Algo esta fallando en el server');
        })
      )
  }

  getById(id: number)//select by id
  {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
  }

  create(mascota: any) {
    return this.http.post(`${this.apiUrl}`, mascota);
  }

  Update(mascota: any, id: number) {
    return this.http.put(`${this.apiUrl}/${id}`, mascota);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



}
