import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevice/auth.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  loginForm!: FormGroup;
  isAdmin: string | null = null;
  isShow: boolean = true;
  showAdminButton: boolean = false;
  showUserButton: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    const token = localStorage.getItem('');


      if(token){
        this.isShow = false;
      }
      this.isAdmin = localStorage.getItem('acc') ?? null;
    }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
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

          this.isAdmin = localStorage.getItem('acc') ?? null;

          if (this.isAdmin === '1') {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });

          } else {
            alert('Sai tài khoản hoặc mật khẩu');
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
}
