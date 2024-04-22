import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if(this.loginForm.invalid) { return }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe((response) => {
      console.log(response);
      if (response?.user) {
        const { accessToken } = response.user.multiFactor.user;
        localStorage.setItem('token', accessToken);
        this.router.navigate(['/products']);
      } else {
        console.error('Error: No se recibió un idToken en la respuesta');
      }
    });
  }


}
