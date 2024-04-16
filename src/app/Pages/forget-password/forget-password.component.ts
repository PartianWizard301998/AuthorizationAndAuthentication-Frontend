import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export default class ForgetPasswordComponent implements OnInit{

  forgateForm !: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);


  ngOnInit(): void {
    this.forgateForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
    })
  }

  submit() {
      this.authService.sendEmailService(this.forgateForm.value.email).subscribe({
        next: (res)=>{
          alert(res.message);
          this.forgateForm.reset();
        },
        error: (err) =>{
          alert(err.error.message);
        }
      })
    }

}
