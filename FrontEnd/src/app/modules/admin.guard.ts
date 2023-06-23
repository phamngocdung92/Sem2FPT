import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {

    const isAdmin = localStorage.getItem('acc') === '1';
    if (!isAdmin) {
      this.router.navigate(['/home']); // Chuyển hướng đến trang mặc định nếu không phải là Admin
    }
    return isAdmin;
  }

}
