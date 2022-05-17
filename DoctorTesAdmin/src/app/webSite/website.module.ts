import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SwiperModule } from 'swiper/angular';
import { HomeComponent } from './pages/home/home.component';
import { ImgComponent } from './components/img/img.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ReversePipe } from './pipes/reverse.pipe';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ImgComponent,
    NavComponent,
    ProductsComponent,
    ProductComponent,
    ReversePipe,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  exports: [
    ImgComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule
  ]
})
export class WebsiteModule { }
