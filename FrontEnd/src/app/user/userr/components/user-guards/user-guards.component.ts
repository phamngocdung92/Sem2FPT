import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AdminGuard } from 'src/app/modules/admin.guard';
import { AuthService } from 'src/app/sevice/auth.service';
import { ProductService } from 'src/app/sevice/products.sevice';
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
  userData: any;
  user:any={}
  id!: string|null
  // localStorageData!: any[];
  // localStorageData: { key: string; value: string }[] = [];
  username!: string | null;
  email!: string | null;
  phone!: string | null;
  address!: string | null;
  constructor(private router: Router , private auth : AuthService ,private route : ActivatedRoute ,private productService:ProductService ,) {}

  ngOnInit() {
    // const localStorageKeys = Object.keys(localStorage);
    // this.localStorageData = localStorageKeys.map(key => localStorage.getItem(key));
    
        this.username = localStorage.getItem('username');
        this.email = localStorage.getItem('email');
        this.phone = localStorage.getItem('phone');
        this.address = localStorage.getItem('address');

        this.getDetailUser()
  }

  getDetailUser() {
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10); // Chuyển đổi thành số nguyên
      this.productService.getDetailAcc(idNumber).subscribe(data => {
        this.user = data.result;
        console.log(this.user);
      });
    } 
  }
updateUser(){
  this.productService.updateAcc(this.user.id,this.user).subscribe(data => {
    this.router.navigateByUrl('/admin/mentor');
  })
}

  logout():void{
    this.auth.logout();
  }

}
