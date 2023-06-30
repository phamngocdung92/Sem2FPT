import { Component, Injectable, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Bill } from 'src/app/model/bill';
import { Cart } from 'src/app/model/cart';
import { AdminGuard } from 'src/app/modules/admin.guard';
import { AuthService } from 'src/app/sevice/auth.service';
import { ProductService } from 'src/app/sevice/products.sevice';
import { UserGuard } from 'src/app/user/user.guard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  user: any = {}
  cart:any={}
  id!: string|null
  // localStorageData!: any[];
  // localStorageData: { key: string; value: string }[] = [];
  username!: string | null;
  email!: string | null;
  phone!: string | null;
  address!: string | null;
  CARTS: Cart[] = [];
  bill: Bill[]=[];
  userId: any;
  linkpay : any ={};
  redirectUrl :string | undefined ;
  closeResult: string | undefined;
  constructor(private router: Router ,private modalService: NgbModal, private auth : AuthService ,private route : ActivatedRoute ,private productService:ProductService , private http: HttpClient) {}

  ngOnInit() {
    // const localStorageKeys = Object.keys(localStorage);
    // this.localStorageData = localStorageKeys.map(key => localStorage.getItem(key));
    const userId = localStorage.getItem('id_user');
    const payload = {
      userId: userId,
      // Thêm các trường dữ liệu khác vào payload nếu cần thiết
    };
        this.username = localStorage.getItem('username');
        this.email = localStorage.getItem('email');
        this.phone = localStorage.getItem('phone');
        this.address = localStorage.getItem('address');

    this.getDetailUser()
    this.getCartUser()
    this.postDataAndRedirect()
    this.productService.getBill().subscribe(
      (data: any) => {
        this.bill = data.message;
        console.log(this.bill)
      },
      (error) => {
        console.error('Lỗi:', error);
      }

    );
   
  }
  Payment() {
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10);
      this.productService.Pay(idNumber).subscribe(
        (useId: number) => {
          this.userId = useId;
          console.log('User ID:', this.userId); // Hiển thị giá trị ID người dùng trong console
        },
        (error) => {
          console.log('Error:', error); // Xử lý lỗi nếu có
        }
      );
    }
  }
  
  postDataAndRedirect() {
    const id = localStorage.getItem('id_user');
    const data = {
      userId: id
    };
    console.log(data)
    this.http.post('http://localhost:3006/payment', data).subscribe(
    
      (response: any) => {
        this.redirectUrl = response.message; // Đường link trả về từ API
        console.log(this.redirectUrl)
        window.open(this.redirectUrl,'_/blank');
      },
      (error: any) => {
        // Xử lý lỗi (nếu có)
      }
    );
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
  getCartUser() {
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10);
      this.productService.getCartUser(idNumber).subscribe(
        (data: any) => {
          this.CARTS = data.result;
          console.log(this.CARTS)
        },
        (error) => {
          console.error('Lỗi:', error);
        }

      )
    }
  }
updateUser(){
  this.productService.updateAcc(this.user.id, this.user).subscribe(data => {
    const confirmation = window.confirm('Bạn có chắc chắn muốn cập nhật mục này?');
    alert('Cập Nhật Thành Công  ')
    this.router.navigate(['/user/guards']).then(() => {
      window.location.reload();
    });
    
  })
}
openScrollableContent(longContent: any) {
  this.modalService.open(longContent, { scrollable: true,size: 'xl' });
}

  logout():void{
    this.auth.logout();
  }

}
