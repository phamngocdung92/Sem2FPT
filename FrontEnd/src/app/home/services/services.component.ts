import { Component,OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
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

    if  (confirm()){
      alert('Your massage has been sent');
    }


  }
}

