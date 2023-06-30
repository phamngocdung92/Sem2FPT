import { Component } from '@angular/core';
import { ProductService } from '../sevice/products.sevice';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {
  images: any[] = [];
  product:any[]=[];
  constructor(private dataService: ProductService,private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.getPmenu()
     
  }
  firstImage(images: string[]): string {
    if (images && images.length > 0) {
      return images[0]; // Trả về ảnh đầu tiên trong danh sách
    }
    return ''; // Trả về chuỗi rỗng nếu danh sách ảnh trống
  }
  getPmenu(){
    this.route.params.subscribe(params => {
      const productId = params['id']; // Lấy giá trị của id từ URL
      this.dataService.getWatchmore(productId).subscribe(
        (res) => {
          this.images = res.result;
          console.log(this.images) // Gán thông tin sản phẩm vào biến product
          this.images.forEach((product) => {
           
            // this.productID.push(product.id_product);
           
    
    
            //thay thế 'e2' trong product.id_menu === 'e2' bằng các id_menu tương ứng và kiểm tra khớp trong html
            const images = JSON.parse(product.image_product);
            this.images.push(images);
            product.images = images; // Gán giá trị vào product.images
    
          });
        },
        (error) => {
          console.error('Failed to load product details', error);
          // Xử lý lỗi tại đây (ví dụ: thông báo lỗi, chuyển hướng sang trang lỗi, vv.)
        }
      );
    });

      
    }
   
  }

