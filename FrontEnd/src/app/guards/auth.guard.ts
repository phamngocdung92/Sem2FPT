import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../sevice/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private auth: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
    if(!this.auth.isLoggedIn()){
  // neu la null thi lot vao day
  this.router.navigate(['/home']);
  return false;
    }
    return this.auth.isLoggedIn();
  }
}
