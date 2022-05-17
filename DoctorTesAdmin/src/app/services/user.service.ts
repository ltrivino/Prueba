import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/userModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>(this.URI);
  }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.URI, dto);
  }
}
