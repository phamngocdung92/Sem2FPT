import { Component,OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  url = 'http://localhost:4200';
  admin = this.fb.group({
    "email": ["", [Validators.email,Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"), Validators.required]],
    "massage": ["", [Validators.required]],
  })
  // @ts-ignore
  focus: boolean;
  // @ts-ignore
  focus1: boolean;

  constructor( private fb: FormBuilder, private router:Router) { }

  get form1() {
    return this.admin.controls
  }

  ngOnInit(): void {
  }

  onReset() {


}
public isCollapsed = false;
}
