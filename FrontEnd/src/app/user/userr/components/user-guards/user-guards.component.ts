import { Component, Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminGuard } from 'src/app/modules/admin.guard';
import { AuthService } from 'src/app/sevice/auth.service';
import { UserGuard } from 'src/app/user/user.guard';
@Component({
  selector: 'app-user-guards',
  templateUrl: './user-guards.component.html',
  styleUrls: ['./user-guards.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserGuardsComponent implements OnInit {
  data:any;
	active = 1;
 
  constructor(private router: Router,private auth: AuthService) { }
  ngOnInit(): void {
    window.onbeforeunload = () => {
      // Lưu dữ liệu vào localStorage trước khi rời khỏi trang
      localStorage.setItem('data', JSON.stringify(this.data));
    };
    
  }
 
  logout():void{
    this.auth.logout();
  }

}
