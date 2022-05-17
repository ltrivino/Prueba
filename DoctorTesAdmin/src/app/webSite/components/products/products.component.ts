import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @Input() producto: Producto[] = [];
  @Output() leadMore = new EventEmitter();
  myShoppingCart: Producto[] = [];
  total: number = 0
  showProductDetail = false;
  productChosen: Producto = {
    id: 0,
    descripcion: '',
    precio: 0,
    imagen: '',
    detalle: '',
    estado: false
  };

  constructor(private productServices: ProductsService) {
    this.myShoppingCart = productServices.getShoppingCart();
  }



  onAddToShoppingCart(product: Producto) {
    this.productServices.onAddToShoppingCart(product);
    this.total = this.productServices.getTotal()
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onLoadMore() {
    this.leadMore.emit();
  }
}
