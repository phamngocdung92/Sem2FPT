import { Component, OnInit } from '@angular/core';
import { ProductService } from '../sevice/products.sevice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  email!: string;
  password!: string;

  constructor(private apiService:ProductService) { }

  register() {
    const user = {
      email: this.email,
      password: this.password
    };


  }
}
