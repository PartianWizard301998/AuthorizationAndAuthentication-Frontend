import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../Validators/confirm-password.validators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export default class ResetPassComponent implements OnInit {
 
  resetPassForm !: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);

  token!: string;
  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];        //use the same value in square brackets which you provied in your routes.ts file 
      //console.log(this.token);
    })

    this.resetPassForm = this.fb.group({
      password : ['', Validators.required],
      confirmpassword : ['',Validators.required]
     },
     {
      validator : confirmPasswordValidator('password', 'confirmpassword')
     }
     );
  }

  reset(){
     // console.log(this.resetPassForm.value);
    let resetObj = {
      token : this.token,
      password : this.resetPassForm.value.password
    }
    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res)=>{
        alert(res.message);
        this.resetPassForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) =>{
        alert(err.message);
      }
    })
  }

}
