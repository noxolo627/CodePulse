import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginServiceService } from 'src/app/features/auth/services/login-service.service';
import { User } from 'src/app/features/auth/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  user?: User;
  // showLogout: boolean = false;

  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }

  onLogout() : void {
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }
}
