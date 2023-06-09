import { Component, OnInit } from '@angular/core';
import { ProductService } from '../sevice/products.sevice';
import { AuthService } from '../sevice/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  carts : any = [];
  constructor(private app : ProductService) { }

  ngOnInit(): void {
    this.carts = this.app.getCarts();
    
  }
  
  subtotal(cart: any){
    return cart.quantity* cart.price;

  }
  updateQuantity(idx:number, ev:any){
    let newQuantity  = parseInt( ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 0 ;
    ev.target.value = newQuantity;
    this.carts[idx].quantity = ev.target.value
    console.log (ev.target.value)
    this.app.saveCart(this.carts);
  }
  tangSL(idx:number, qtt:any, ){
    let newQuantity = parseInt(qtt) + 1 ;
    newQuantity = newQuantity <= 100 ? newQuantity : 100 ;
    this.carts[idx].quantity = newQuantity
    this.app.saveCart(this.carts);
  }
  giamSL(idx:number, qtt:any, ){
    let newQuantity = parseInt(qtt) - 1 ;
    newQuantity =newQuantity > 0 ? newQuantity : 1;
    this.carts[idx].quantity = newQuantity
    this.app.saveCart(this.carts);
  }
  removecart(idx:number, ){
    //  this.carts.splice(idx,1);
    //  this.app.saveCart(this.carts);
    if (confirm('are you want')){
      this.carts.splice(idx,1);
      this.app.saveCart(this.carts);
    }
  }
  
  onclearcart(){
    
    if (confirm('ARE YOU SURE')){
      sessionStorage.clear()
     }
     location.reload();
  }
  
}
