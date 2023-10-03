import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authServices: AuthService) {
    this.form = this.fb.group({
      userName: ['leonel.trivino@hotmail.com', Validators.required],
      password: ['admin@Kio25', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.authServices.login(this.form.value.userName, this.form.value.password).subscribe((resp: any) => {
      localStorage.setItem('token', resp['token'])
      this.router.navigateByUrl('/')
    }, error => {
      alert(error)
    });
  }

}
