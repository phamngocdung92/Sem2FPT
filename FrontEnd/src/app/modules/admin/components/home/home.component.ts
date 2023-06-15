import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../sevice/products.sevice';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  Acc :any={}
  constructor( private route : ActivatedRoute , private productService:ProductService , private router : Router) { }

  ngOnInit(): void {
    this.getDetailAcc()
  }
  getDetailAcc(){
    this.route.params.subscribe(data => {
      
      this.productService.getDetailAcc(data['id']).subscribe(data => {
        this.Acc = data.result ;
      })
      
    })
    console.log(this.Acc)
  }

  updateAcc(){
    this.productService.updateAcc(this.Acc.id,this.Acc).subscribe(data => {
      this.router.navigateByUrl('/admin/mentor');
    })
  }
}

