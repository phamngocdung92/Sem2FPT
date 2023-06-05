import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../sevice/products.sevice';

@Component({
  selector: 'app-fix',
  templateUrl: './fix.component.html',
  styleUrls: ['./fix.component.css']
})
export class FixComponent implements OnInit {
  product :any={}
  constructor( private route : ActivatedRoute , private ProductService:ProductService , private router : Router) { }

  ngOnInit(): void {
    this.getDetailproduct()
  }
  getDetailproduct(){
    this.route.params.subscribe(data =>{
      this.ProductService.getDetailproduct(data['id']).subscribe(data => {
       this.product = data
      })
    } )
  }
  editproduct(){
    this.ProductService.editproduct(this.product.id,this.product).subscribe(data => {
      this.router.navigateByUrl("/admin")
    })
  }

}
