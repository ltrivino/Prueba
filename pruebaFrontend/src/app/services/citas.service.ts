import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Citas } from '../models/citas.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = `${environment.API_URL}/api/citas`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Citas[]>(`${this.apiUrl}`)
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
    return this.http.get<Citas>(`${this.apiUrl}/${id}`);
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
