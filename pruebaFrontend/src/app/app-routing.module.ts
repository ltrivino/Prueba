import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    canActivate : [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
