import { Component, OnInit } from '@angular/core';

import { ProductService } from '../sevice/products.sevice';
import { AuthService } from '../sevice/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';
import { Cart } from '../model/cart';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  carts: any = [];
  carts1: any = [];
  CARTS: any[] = [];
  products: any[] = [];
  bill: any={};
  active = 1;
  totalPrice: number = 0;
  redirectUrl: string | undefined;
  closeResult!: string;
  cartItems: Product[] = [];
  productImages: any [] = [];
  sum: number = 0;
  constructor(private app : ProductService,private modalService: NgbModal,private productservice: ProductService ,private http : HttpClient ) { }
  calculateTotalPrice(): void {
    this.sum = 0;
    for (let cart of this.CARTS) {
      this.sum += cart.total_price!;
    }
    console.log(this.sum)
  }
  ngOnInit(): void {
    
    this.getBillUser();
    this.carts = this.app.getCarts();

    this.getCartUser()
    this.productservice.getProducts().subscribe(
      (data: any) => {
        this.products = data.result;

      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10);
      this.productservice.getCartUser(idNumber).subscribe(
        (data: any) => {
          this.carts1 = data.result;
          
        

        },
        (error) => {
          console.error('Lỗi:', error);
        }

      )
    }


  }
  // calculateTotalPrice() {
  //   this.totalPrice = 0; // Đặt giá trị ban đầu của totalPrice là 0

  //   // Duyệt qua từng sản phẩm trong giỏ hàng
  //   for (let i = 0; i < this.CARTS.length; i++) {
  //     const product = this.CARTS[i];
  //     // Tính giá của sản phẩm và cộng vào totalPrice
  //     const productPrice = product.price * product.quantity;
  //     this.totalPrice += productPrice;
  //   }
  // }
  firstImage(images: string[]): string {
    if (images && images.length > 0) {
      return images[0]; // Trả về ảnh đầu tiên trong danh sách
    }
    return ''; // Trả về chuỗi rỗng nếu danh sách ảnh trống
  }
  getBillUser() {
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10); // Chuyển đổi thành số nguyên
      this.productservice.getBillUser(idNumber).subscribe(data => {
        this.bill = data.message;
        console.log(this.bill);
      });
    }
  }
  getCartUser() {
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10);
      this.productservice.getCartUser(idNumber).subscribe(
        (data: any) => {
          this.CARTS = data.result;
          this.calculateTotalPrice()
          this.CARTS.forEach((productss: { image_product: string; images: any; }) => {
          
            // this.productID.push(product.id_product);
          
    
    
            //thay thế 'e2' trong product.id_menu === 'e2' bằng các id_menu tương ứng và kiểm tra khớp trong html
            const images = JSON.parse(productss.image_product!);
            this.productImages.push(images);
            productss.images = images; // Gán giá trị vào product.images
    
          });
          
          
        },
        (error) => {
          console.error('Lỗi:', error);
        }

      )
    }
  }
  PayCard() {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id
    };

    this.http.post<any>('http://localhost:3006/payment', data).subscribe(
      (response: any) => {
        this.redirectUrl = response.message; // Gán giá trị đường link trả về từ API vào redirectUrl
        console.log(this.redirectUrl)
      },
      (error: any) => {
        // Xử lý lỗi (nếu có)
      }
    );
  }
  PayCash() {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id
    };

    this.http.post<any>('http://localhost:3006/payment_cash', data).subscribe(
     
    );
    window.location.reload();
    console.log('thành công')
  }


  DeleteOneProduct(productId: number) {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id,
      productId: productId
    };

    this.http.post<any>('http://localhost:3006/delete/one/product', data).subscribe(

    );
    window.location.reload();
    console.log('thành công')
  }
  Down(productId: number) {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id,
      productId: productId
    };

    this.http.post<any>('http://localhost:3006/decrease/product', data).subscribe(

    );
    window.location.reload();
    console.log('thành công')
  }
  Up(productId: number) {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id,
      productId: productId
    };

    this.http.post<any>('http://localhost:3006/add-to-cart', data).subscribe(

    );
    window.location.reload();
    console.log('thành công')
  }
  DeleteAllProduct() {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id,
    };

    this.http.post<any>('http://localhost:3006/remove/all/product', data).subscribe(

    );
    window.location.reload();
    console.log('thành công')
  }
  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true,size: 'xl' });
  }
  onclearcart(){

    if (confirm('ARE YOU SURE')){
      sessionStorage.clear()
     }
     location.reload();
  }
  onDeleteUserProduct(id: number): void {
    const confirmation = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (confirmation) {
      this.productservice.DeleteUserProduct(id).subscribe(
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
}
