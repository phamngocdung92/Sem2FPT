import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../sevice/auth.service";
import { Product , } from 'src/app/model/products';
import { user } from 'src/app/model/user';
import { ProductService } from 'src/app/sevice/products.sevice';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminGuard } from 'src/app/modules/admin.guard';
@Component({
  selector: 'app-admin-mentor',
  templateUrl: './admin-mentor.component.html',
  styleUrls: ['./admin-mentor.component.css']
})
export class AdminMentorComponent implements OnInit {
  public isCollapsed = false;
  url='http://localhost:3000/Product';
  product:Product;
	active = 1;
  id: any;
  products: any[] = []; // Mảng chứa danh sách sản phẩm
 // Users: any{};
 users: user[] = [];
 
  constructor(private productService: ProductService, private auth: AuthService,private httpClient: HttpClient,private router: Router) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
       // console.log(data)
        this.products = data; // Gán danh sách sản phẩm nhận được từ API vào mảng products
      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
    this.productService.getProduct().subscribe(
      (data: any) => {
        this.users = data.user;
        console.log(this.users);
      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
    
    
  }
  onDelete(id: number): void {
    const url = `http://localhost:3000/Product/${id}`; // Đường dẫn cụ thể cho việc xóa dữ liệu
    this.httpClient.delete(url).subscribe(
      () => {
        window.location.reload();
        console.log('Xóa dữ liệu thành công');
        // Thực hiện các hành động khác sau khi xóa dữ liệu thành công
      },
      (error) => {
        console.error('Lỗi xóa dữ liệu:', error);
      }
    );
  }
  onDeleteAcc(id: number): void {
    const confirmation = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (confirmation) {
      this.productService.DeleteAcc(id).subscribe(
        () => {
          window.location.reload();
          console.log('Xóa dữ liệu thành công');
          // Thực hiện các hành động khác sau khi xóa dữ liệu thành công
        },
        (error) => {
          console.error('Lỗi xóa dữ liệu:', error);
        }
      );
    } else {
      console.log('Hủy xóa dữ liệu');
      // Thực hiện các hành động khác khi hủy xóa dữ liệu
    }
  }
  compare(){

  }
  
  
  // onAcc(id: number | undefined): void {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'token': `Bearer ${token}`
  //   });
  //   if (id !== undefined) {
  //     const url = `http://localhost:3006/users/delete/${id}`; // Đường dẫn cụ thể cho việc xóa dữ liệu
  //     this.httpClient.delete(url).subscribe(
  //       () => {
  //         window.location.reload();
  //         console.log('Xóa dữ liệu thành công');
  //         // Thực hiện các hành động khác sau khi xóa dữ liệu thành công
  //       },
  //       (error) => {
  //         console.error('Lỗi xóa dữ liệu:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Id không tồn tại');
  //   }
  // }
  
  save1(){
    this.httpClient.post(this.url, this.product).subscribe(data=>{
      window.location.reload();
        console.log(data);
    })
  }
 
  logout():void{
    this.auth.logout();
  }
  
}
