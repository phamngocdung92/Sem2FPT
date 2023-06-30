import { Component } from '@angular/core';
import { ProductService } from 'src/app/sevice/products.sevice';
import { Product } from '../../model/products';
import { Route } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check3',
  templateUrl: './check3.component.html',
  styleUrls: ['./check3.component.css']
})
export class Check3Component {
  product: any[] = [];
  productImages: any [] = [];
  currentItemIndex: number = 0;

  constructor(private productService: ProductService,private router: Router) { }
  firstImage(images: string[]): string {
    if (images && images.length > 0) {
      return images[0]; // Trả về ảnh đầu tiên trong danh sách
    }
    return ''; // Trả về chuỗi rỗng nếu danh sách ảnh trống
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: any) => {

          this.product = data.result;
        console.log(this.product);
        this.product.forEach((products) => {
          
          // this.productID.push(product.id_product);
        
  
  
          //thay thế 'e2' trong product.id_menu === 'e2' bằng các id_menu tương ứng và kiểm tra khớp trong html
          const images = JSON.parse(products.image_product);
          this.productImages.push(images);
          products.images = images; // Gán giá trị vào product.images
  
        });

      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
  }

  next() {
    if (this.currentItemIndex < this.product.length - 1) {
      this.currentItemIndex++;
    }
  }
  navigateToDetail(productId: number) {
    this.productService.getDetailproduct(productId).subscribe(
      (res :any) => {
        const product: Product = res.result; // Lấy thông tin sản phẩm từ kết quả trả về
        const url = '/detail/' + product.id_product;
       
        window.location.href = url;
       
        
        
      },
      (error) => {
        console.error('Failed to load product details', error);
        // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
      }
    );
    
  }


  prev() {
    if (this.currentItemIndex > 0) {
      this.currentItemIndex--;
    }
  }
}
