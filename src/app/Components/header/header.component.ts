import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

router = inject(Router);
authService = inject(AuthService);

isLoggedIn : boolean = false;

ngOnInit(): void {
  this.authService.isLoggedIn$.subscribe(res =>{
   this.isLoggedIn = this.authService.isLoggedIn();
  });
}


logout() {
  localStorage.removeItem("user_id");
  this.authService.isLoggedIn$.next(false);
  this.router.navigate(['login']);
}


  
}
