import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = localStorage.getItem('element') === '1';
    if (isAdmin) {
      this.router.navigate(['/home']); // Chuyển hướng đến trang mặc định nếu là Admin
    }
    return !isAdmin;
  }
 
}
