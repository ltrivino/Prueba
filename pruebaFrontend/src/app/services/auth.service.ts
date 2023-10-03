import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = `${environment.API_URL}/api/cuentas`;
  private user = new BehaviorSubject<Auth | null>(null);
  private email = new BehaviorSubject<string | null>(null);
  user$ = this.user.asObservable();
  email$ = this.email.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.email.next(email);
        }),
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null);
  }
}
