import { Menu } from 'src/app/model/menu';
import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/sevice/products.sevice';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Menu2 } from 'src/app/model/menu2';
import { Product } from 'src/app/model/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
 
  menus: Menu[]=[];
  menus2: Menu2[]=[];
  check_column : string | null | undefined;
  menn2:any={};
  
  constructor(private productService: ProductService, private httpClient: HttpClient,private router: Router) {
   
    
    this. check_column = localStorage.getItem('check') ?? null;
  }
  getMenu2Items(id_menu: string| undefined): Menu2[] {
    const menuId = id_menu !== undefined ? id_menu : '';
    return this.menus2.filter(menu2 => menu2.id_menu === menuId ) ;
  
    
    
  }
  getidmenu2(){
   
      
    this.productService.getMenu2().subscribe(
      (data: any) => {
        if (data && Array.isArray(data.result)) {
          this.menn2 = data.result;
  
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
  goToListProducts(id_menu2: string): void {
    this.router.navigate(['menuProduct2/list', id_menu2]);
  }
 
  navigateToWatchmore(menu2Id: string | undefined) {
    if (menu2Id !== undefined) {
      this.productService.getWatchmore(menu2Id).subscribe(
        (res) => {
          const url = '/menuProduct2/list/' + menu2Id;
          window.open(url, '_blank');
        },
        (error) => {
          console.error('Failed to load product details', error);
          // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
        }
      );
    }
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