
import { Component, OnInit, TemplateRef, ViewEncapsulation, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  compare : any = [];
  constructor() { }

  ngOnInit(): void {

  }
  subtotal(com: any){
    return com.quantity* com.price;

  }
  upQuantity(idx:number, ev:any){
    let newQuantity  = parseInt( ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 0 ;
    ev.target.value = newQuantity;
    this.compare[idx].quantity = ev.target.value
    console.log (ev.target.value)

  }
  tangSL(idx:number, qtt:any, ){
    let newQuantity = parseInt(qtt) + 1 ;
    newQuantity = newQuantity <= 100 ? newQuantity : 100 ;
    this.compare[idx].quantity = newQuantity

  }
  giamSL(idx:number, qtt:any, ){
    let newQuantity = parseInt(qtt) - 1 ;
    newQuantity =newQuantity > 0 ? newQuantity : 1;
    this.compare[idx].quantity = newQuantity

  }
  removecom(idx:number, ){
    //  this.carts.splice(idx,1);
    //  this.app.saveCart(this.carts);
    if (confirm('are you want')){
      this.compare.splice(idx,1);

    }
  }

  onclearcom(){

    sessionStorage.clear()
      // if (confirm('xoa het')){
      //  sessionStorage.clear()
      // }
  }

}
