import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginServiceService } from '../services/login-service.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  model: LoginRequest;
  loginSubscription?: Subscription;

  constructor(
    private loginService: LoginServiceService,
    private cookieService: CookieService,
    private router: Router
  ){
    this.model = {
      email: "",
      password: "",
    }
  }

  onLogin() : void{
    console.log(this.model);
    this.loginSubscription = this.loginService.login(this.model)
      .subscribe({
        next: (response) => {
        //set Auth Cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict' );

          //Set user
          this.loginService.setUser({
            email: response.email,
            roles: response.roles
          })

          //Redirect the User to home page
          this.router.navigateByUrl('/');
        }
      });
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
