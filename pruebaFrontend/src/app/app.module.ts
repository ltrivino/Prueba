import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { NameMascotaPipe } from './pipes/name-mascota.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotfoundComponent,
    NavComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
