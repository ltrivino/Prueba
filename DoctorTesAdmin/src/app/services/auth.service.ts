import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/userModel';
import { Auth } from '../models/authModel';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URI: string = `${environment.apiUrl}/cuentas`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.URI);
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.URI}/login`, { email, password })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.BadRequest) {

          return throwError(() => Error('Error de credenciales'))
        }
        if (error.status === HttpStatusCode.NotFound) {

          return throwError(() => Error('El producto no existe'))
        }
        return throwError(() => Error('Ups'))
      })
    );
  }

  profile(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.URI}/profile`, { headers });
  }
}
