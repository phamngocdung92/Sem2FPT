import { Component, OnInit, TemplateRef, ViewEncapsulation, ElementRef,HostListener, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import { async } from '@angular/core/testing';

// import { AuthService } from 'src/app/sevice/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/sevice/auth.service';
import { ProductService } from 'src/app/sevice/products.sevice';
import { CartService } from 'src/app/sevice/app.sevice';
// import { AuthService } from 'src/app/sevice/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  productCount: number = 0;
  loginForm!: FormGroup;
  result: any;
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
  constructor(
    public location: Location,
    private http: HttpClient,
    private auth: AuthService,
    private element: ElementRef,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder,
    private account: ProductService,
    private cartService: CartService
  ) {
    const token = localStorage.getItem('');

    if (token) {
      this.isShow = false;
    }
    this.isAdmin = localStorage.getItem('acc') ?? null;
  }
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: '0',
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    const isAdmin: string = localStorage.getItem('acc') ?? '';
    this.isAdmin = isAdmin;

    if (isAdmin === '1') {
      this.showAdminButton = true;
      this.showUserButton = false;
    } else if (isAdmin === '0') {
      this.showAdminButton = false;
      this.showUserButton = true;
    } else {
      this.showAdminButton = false;
      this.showUserButton = false;
    }
    this.getCartUser()
  }
  // clearLocalStorage() {
  //   localStorage.clear();
  //   this.showAdminButton = false;
  //   this.showUserButton = false;
  // }
  getCartUser() {
    const id = localStorage.getItem('id_user');
    if (id) {
      const idNumber = parseInt(id, 10);
      this.account.getCartUser(idNumber).subscribe(
        (data: any) => {
          this.productCount = data.result.length;
          console.log(this.productCount)
        },
        (error) => {
          console.error('Lỗi:', error);
        }

      )
    }
  }
  
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          localStorage.setItem('username', result.username);
          localStorage.setItem('id_user', result.id);
          localStorage.setItem('email', result.email);
          localStorage.setItem('token', result.accesstoken1);
          localStorage.setItem('acc', result.isAdmin);
          const isAdmin: string = localStorage.getItem('acc') ?? '';
          this.isAdmin = localStorage.getItem('acc') ?? null;
          if (isAdmin === '1') {
            window.onbeforeunload = () => {
              localStorage.setItem('acc', '1');
            };
            this.router.navigate(['/admin/mentor']);
            window.location.reload();
          } else if (isAdmin === '0') {
            window.onbeforeunload = () => {
              localStorage.setItem('acc', '0');
            };
            this.router.navigate(['/user/guards']);
            window.location.reload();
          } else {
            this.showUserButton = false;
            this.showAdminButton = false;
            alert('sai tài khoản hoặc mật khẩu');
            this.router.navigate(['/home']);
          }
        },
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
  onLogin() {
    if (this.formLogin.invalid) {
      return false;
    }
    //console.log(this.formLogin.value);  ctrl shift i để xem console.log
    // Bay h doan nay se la xu ly:
    //1. goi API -> lay token -> luu vao localstorage (viet service lay API)
    this.account.login(this.formLogin.value).subscribe((res) => {
      if (res != null) {
        // luu ma token vao localstorage:

        this.router.navigate(['/user/guards']).then(() => {
          window.location.reload();
        });
      } else {
        console.log(this.formLogin.value);
        alert('Tai khoan nay da ton tai');
      }
    });
    return true;
  }
  // @ts-ignore
  focus: boolean;
  // @ts-ignore
  focus1: boolean;
  url = 'http://localhost:4200';
  get form1() {
    return this.loginForm.controls;
  }
  searchData(): void {
    // Gửi yêu cầu tìm kiếm dữ liệu
    this.http
      .get(`http://localhost:3006/product/search?q=${this.searchQuery}`)
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
  
  
  logout(): void {
    this.auth.logout();
  }
}
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.getElementById("navbar");

  if (navbar) {
    if (prevScrollpos > currentScrollPos) {
      navbar.style.top = "-5px";
    } else {
      navbar.style.top = "-110px";
    }
    prevScrollpos = currentScrollPos;
  }
};
