import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private productService: ProductsService,
    private authService: AuthService) { }

  activeMenu = false;
  counter = 0;
  profile: User | null = null

  token = '';

  ngOnInit(): void {
    this.productService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggerMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginAndGetProfile() {
    this.authService.login('leo@mail.com', '12345')
      .pipe(
        switchMap((token) => { this.token = token.access_token; return this.authService.profile(token.access_token) })
      )
      .subscribe(user => {
        this.profile = user
      });
  }

  getProfile() {
    this.authService.profile(this.token!).subscribe(user => {
      this.profile = user
    });
  }

}
