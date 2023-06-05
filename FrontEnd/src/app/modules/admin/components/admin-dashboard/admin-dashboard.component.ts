import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../sevice/auth.service";
import { Product } from 'src/app/model/products';
import { ProductService } from 'src/app/sevice/products.sevice';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public isCollapsed = false;
  url='http://localhost:3000/Product';
  product:Product;
	active = 1;
  id: any;
  products: any[] = []; // Mảng chứa danh sách sản phẩm

  constructor(private productService: ProductService, private auth: AuthService,private httpClient: HttpClient,private router: Router) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; // Gán danh sách sản phẩm nhận được từ API vào mảng products
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
  save1(){
    this.httpClient.post(this.url, this.product).subscribe(data=>{
      window.location.reload();
        console.log(data);
    })
  }
  // editData(id: number) {
  //   this.productService.get(id).subscribe(
  //     (response: any) => {
  //       const apiDetail = response.data;
  //       // Chuyển hướng đến trang sửa dữ liệu với id tương ứng
  //       this.router.navigate(['/edit', id]);
  //     },
  //     (error: any) => {
  //       console.error('Lỗi khi lấy dữ liệu chi tiết:', error);
  //     }
  //   );
  // }
  logout():void{
    this.auth.logout();
  }
}
