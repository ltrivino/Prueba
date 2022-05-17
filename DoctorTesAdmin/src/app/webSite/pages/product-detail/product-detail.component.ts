import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  producto: Producto | null = null;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productsService.getProductsById(parseInt(this.productId));
          }
          return [null];
        })
      )
      .subscribe((data) => {
        this.producto = data;
      });
  }

  goToBack() {
    this.router.navigateByUrl('/');
  }


}
