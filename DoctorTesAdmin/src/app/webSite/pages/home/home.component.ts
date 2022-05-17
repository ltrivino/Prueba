import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  producto: Producto[] = [];
  myShoppingCart: Producto[] = [];
  total: number = 0
  showProductDetail = false;

  img?: string

  constructor(private userService: UserService, private productServices: ProductsService) { }
  ngOnInit(): void {
    this.productServices.getAllProducts().subscribe(product => {
      console.log(product);
      this.producto = product
    });
  }

  onLoaded(img: string) {
    console.log("log padre");
    console.log(img);
  }

  createUser() {
    this.userService.create({
      name: 'Leonel',
      email: 'leo@mail.com',
      password: '12345'
    })
      .subscribe(rta => {
        console.log(rta);
      });
  }

  onLoadMore() {
    this.productServices.getAllProducts()
      .subscribe(data => {
        this.producto = this.producto.concat(data);
      });
  }

}
