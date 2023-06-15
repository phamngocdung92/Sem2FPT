import { Menu } from 'src/app/model/menu';
import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/sevice/products.sevice';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Menu2 } from 'src/app/model/menu2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
  menuss:Menu ={};
  menus: Menu[]=[];
  menus2: Menu2[]=[];
  check_column : string | null | undefined;
  
  constructor(private productService: ProductService, private httpClient: HttpClient,private router: Router) {
   
    
    this. check_column = localStorage.getItem('check') ?? null;
  }
  getMenu2Items(menuIndex: number, isLast: boolean): any[] {
    const startIndex = menuIndex * 2;
    const endIndex = isLast ? startIndex + 4 : startIndex + 2;
    return this.menus2.slice(startIndex, endIndex);
  }
  ngOnInit(): void {
  //   this.productService.getMenu().subscribe(
  // (data)=> {
  //   this.menus = data;
  //   console.log(this.menus);
  // },
  // (error)=> {
  //   console.error('lỗi',error)
  // }
  //   );
  this.productService.getMenu().subscribe(
    (data: any) => {
      if (data && Array.isArray(data.result)) {
        this.menus = data.result;
       
      

       
      } else {
        console.error('Dữ liệu không hợp lệ');
        // Xử lý lỗi tại đây, ví dụ: gán một giá trị mặc định cho this.menus
      }
    },
    (error) => {
      console.error('Lỗi:', error);
    }
  );
  this.productService.getMenu2().subscribe(
    (data: any) => {
      if (data && Array.isArray(data.result)) {
        this.menus2 = data.result;

      } else {
        console.error('Dữ liệu không hợp lệ');
        // Xử lý lỗi tại đây, ví dụ: gán một giá trị mặc định cho this.menus
      }
    },
    (error) => {
      console.error('Lỗi:', error);
    }
  );
  
  
 
    
  }
  
}