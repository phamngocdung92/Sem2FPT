import { Component,OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/sevice/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isAdmin!: string | null;
  showAdminButton: boolean = false;
  showUserButton: boolean = false;
  url = 'http://localhost:4200';
  admin = this.fb.group({
    "email": ["", [Validators.email,Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"), Validators.required]],
    "massage": ["", [Validators.required]],
  })
  // @ts-ignore
  focus: boolean;
  // @ts-ignore
  focus1: boolean;

  constructor( private fb: FormBuilder, private router:Router , private auth : AuthService) { }

  get form1() {
    return this.admin.controls
  }

  ngOnInit(): void {
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
        this.showUserButton = true;
      }
  }

  onReset() {


}
 logout():void{
    this.auth.logout();
  }
public isCollapsed = false;
}
