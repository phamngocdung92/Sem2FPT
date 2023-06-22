import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const isAdmin = localStorage.getItem('acc') === '1';
    if (!isAdmin) {
      window.location.reload();
      this.router.navigate(['/home']); // Chuyển hướng đến trang mặc định nếu không phải là Admin
    }
    return isAdmin;
  }

}
