import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
  ){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.shoulInterceptRequest(req)){

      const authRequest = req.clone({
        setHeaders: {
          "Authorization": this.cookieService.get('Authorization')
        }
      });

      return next.handle(authRequest);
    }
    return next.handle(req);
  }

  shoulInterceptRequest(request: HttpRequest<any>): boolean{
    return request.urlWithParams.indexOf('addAuth=true', 0) >-1 ? true : false;
  }
}
