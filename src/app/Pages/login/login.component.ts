import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export default class LoginComponent implements OnInit {
  

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

loginForm !: FormGroup;

ngOnInit(): void {
  this.loginForm = this.fb.group({
   email : ['', Validators.compose([Validators.required, Validators.email])],
   password : ['', Validators.required],
  });
 }

 login() {
  this.authService.loginService(this.loginForm.value).subscribe({
    next : (res) =>{
      console.log(res.message);
      //localStorage.setItem('payload',JSON.stringify(res.data));
      localStorage.setItem("user_id", res.data._id);
      this.authService.isLoggedIn$.next(true);
      this.router.navigate(['home']);
      this.loginForm.reset(); 
    },
    error : (err) =>{
      console.log(err.message); 
    }
  })
  }

}
