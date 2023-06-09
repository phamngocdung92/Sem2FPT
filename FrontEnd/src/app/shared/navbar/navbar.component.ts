import { Component, OnInit, TemplateRef, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/sevice/auth.service';
import { ProductService } from 'src/app/sevice/products.sevice';
// import { AuthService } from 'src/app/sevice/auth.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    loginForm!: FormGroup;
    result:any;
    active = 1;
    searchQuery!: string;
    searchResults: any[] = [];
    isShow: boolean = true;
    formLogin!: FormGroup;
    isAdmin!: string | null;
    showAdminButton: boolean = false;
    showUserButton: boolean = false;

    // username: string = ''; // Initialize the property with an empty string
    // email: string = '';
    // password: string = '';
    constructor(public location: Location, private http: HttpClient, private auth : AuthService, private element : ElementRef, private router : Router, private offcanvasService: NgbOffcanvas,private fb: FormBuilder, private account: ProductService) {
      const token = localStorage.getItem('token');


      if(token){
        this.isShow = false;
      }
    }
    ngOnInit(): void {
      this.formLogin = this.fb.group({
        username:['',Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        isAdmin:'0'
      });
      this.loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }); 
     
  }
  clearLocalStorage() {
    localStorage.clear();
    this.isAdmin = null;
    this.showAdminButton = false;
    this.showUserButton = false;
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          localStorage.setItem('username', result.username);
          localStorage.setItem('id_user', result.id);
          localStorage.setItem('email', result.email);
          localStorage.setItem("token", result.accesstoken1);
          localStorage.setItem('element', result.isAdmin);
          const isAdmin: string = localStorage.getItem('element') ?? ''; // Sử dụng nullish coalescing operator (??) để gán giá trị mặc định là chuỗi rỗng nếu giá trị là nullish
          if (isAdmin === '1' ) {
           
            this.showAdminButton = true;
            this.router.navigate(['/admin/mentor']);
            
          } else if (isAdmin === '0') {
            this.showUserButton = true;
            this.router.navigate(['/user/guards']);
          }
           else {
            // Xử lý khi không xác định được isAdmin
            // Ví dụ: Chuyển hướng đến một trang khác hoặc hiển thị thông báo lỗi

            this.router.navigate(['/default']);
          }     
        } ,
        
        (error: any) => {
          alert('Đã xảy ra lỗi khi đăng nhập.');
          console.error('Lỗi:', error);
        }
      );
    }

}
    openEnd(content: TemplateRef<any>) {
      this.offcanvasService.open(content, { position: 'end' });
    }
    openTop(contentt: TemplateRef<any>) {
      this.offcanvasService.open(contentt, { position: 'top' });
    }
    onLogin(){
      if(this.formLogin.invalid){
        return false;
      }
    //console.log(this.formLogin.value);  ctrl shift i để xem console.log
    // Bay h doan nay se la xu ly:
    //1. goi API -> lay token -> luu vao localstorage (viet service lay API)
    this.account.login(this.formLogin.value).subscribe(res=>{
      if(res.result != null){
        // luu ma token vao localstorage:
         localStorage.setItem("token", res.result);
         alert("tao tai khoan thanh cong");

        //localStorage.setItem("account", res.name);  day la object ve account's person
         this.router.navigate(['/home']);
      }else{
        console.log(this.formLogin.value);
        alert("Tai khoan nay da ton tai")

      }
    })
    return true;
  }

  // @ts-ignore
  focus: boolean;
  // @ts-ignore
  focus1: boolean;
  url = 'http://localhost:4200';
get form1() {
  return this.loginForm.controls
}
searchData(): void {
  // Gửi yêu cầu tìm kiếm dữ liệu
  this.http.get(`http://localhost:3000/Product?q=${this.searchQuery}`)
    .subscribe(
      (response: any) => {
        // Xử lý dữ liệu tìm kiếm thành công
        this.searchResults = response as any[]; // Chuyển đổi kiểu dữ liệu thành mảng any[]
        this.router.navigateByUrl('/search?q=' + this.searchQuery);
      },
      (error) => {
        // Xử lý lỗi khi tìm kiếm dữ liệu
        console.error('Lỗi tìm kiếm dữ liệu:', error);
      }
    );
}
}



