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
  userData: any;
  // localStorageData!: any[];
  // localStorageData: { key: string; value: string }[] = [];
  username!: string | null;
  email!: string | null;
  constructor(private router: Router , private auth : AuthService) {}

  ngOnInit() {
    // const localStorageKeys = Object.keys(localStorage);
    // this.localStorageData = localStorageKeys.map(key => localStorage.getItem(key));
      // this.getDataFromLocalStorage();
        this.username = localStorage.getItem('username');
        this.email = localStorage.getItem('email');  
  }

  // getDataFromLocalStorage() {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     if (key !== null) {
  //       const value = localStorage.getItem(key);
  //       if (value !== null) {
  //         this.localStorageData.push({ key, value });
  //       }
  //     }
  //   }
  // }  
  logout():void{
    this.auth.logout();
  }

}
