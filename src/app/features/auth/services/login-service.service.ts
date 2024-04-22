import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { use } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  login(request: LoginRequest) : Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser (user: User) : void {

    this.$user.next(user);

    localStorage.setItem('user-email', user.email),
    localStorage.setItem('user-roles', user.roles.join(','))
  }

  user(): Observable<User | undefined>{
    return this.$user.asObservable();
  }

  logout() : void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);

  }
}
