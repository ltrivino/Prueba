import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() producto: Producto = {
    id: 0,
    descripcion: '',
    precio: 0,
    imagen: '',
    detalle: '',
    estado: false
  };
  @Output() addedProduct = new EventEmitter<Producto>();
  @Output() showDetail = new EventEmitter<number>();

  constructor(private productoServices: ProductsService) { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addedProduct.emit(this.producto)
  }

  onShowDetail(){
    this.showDetail.emit(this.producto.id)
  }

}
