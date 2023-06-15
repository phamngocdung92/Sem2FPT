import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../../../sevice/products.sevice';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menu :any={}
  constructor( private route : ActivatedRoute , private productService:ProductService , private router : Router) { }

  ngOnInit(): void {
    this.getMenuu()
  }
  getMenuu(){
    this.route.params.subscribe((data) => {
      
      this.productService.getMenuu(data['id']).subscribe(data => {
        this.menu = data.result;
        console.log(this.menu)
      })
      
    })
   
  }
 
  updateMenu(){
    this.productService.EditMenu(this.menu.id_menu,this.menu).subscribe(data => {
      this.router.navigateByUrl('/admin/mentor');
     
      
    })
  }
}
