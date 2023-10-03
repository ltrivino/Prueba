import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.email$.subscribe(email => {
      this.profile = email;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }


  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/auth/login']);
  }

}
