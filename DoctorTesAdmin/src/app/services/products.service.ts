import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, throwError, } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private myCart = new BehaviorSubject<Producto[]>([]);

  URI: string = `${environment.apiUrl}`;

  myShoppingCart: Producto[] = [];
  myCart$ = this.myCart.asObservable();


  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Producto[]>(`${this.URI}/producto`)
  }




  getProductsById(id: number) {
    debugger
    return this.http.get<Producto>(`${this.URI}/producto/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {

            return throwError(() => Error('Algo fallo en el server'))
          }
          if (error.status === HttpStatusCode.NotFound) {

            return throwError(() => Error('El producto no existe'))
          }
          return throwError(() => Error('Ups'))
        })
      );
  }




  onAddToShoppingCart(producto: Producto) {
    this.myShoppingCart.push(producto)
    this.myCart.next(this.myShoppingCart)
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.precio, 0);
  }

}
