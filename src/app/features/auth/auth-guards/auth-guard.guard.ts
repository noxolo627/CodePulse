import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginServiceService } from '../services/login-service.service';
import {jwtDecode} from 'jwt-decode'

export const authGuardGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const loginService = inject(LoginServiceService);
  const router = inject(Router);

  let token = cookieService.get('Authorization');

  if(token){

  }

  loginService.logout();
  return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}})
};
