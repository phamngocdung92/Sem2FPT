import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../../../sevice/products.sevice';
import { mergeMap } from 'rxjs/operators';
import { Menu } from 'src/app/model/menu'; 
import { Menu2 } from 'src/app/model/menu2'; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menu :any={};
  menu2 :any={};
  menu2Data: Menu2[] = [];
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
  getMenu2() {
    this.route.params.subscribe((data) => {
      this.productService.getMenuu(data['id']).pipe(
        mergeMap((menu: Menu) => {
          return this.productService.getMenuu2(menu.id_menu!);
        })
      ).subscribe((menu2Data: Menu2[]) => {
        this.menu2Data = menu2Data;
        console.log(this.menu2Data);
      });
    });
  }
  
  updateMenu(){
    this.productService.EditMenu(this.menu.id_menu,this.menu).subscribe(data => {
      this.router.navigateByUrl('/admin/mentor');
     
      
    })
  }
}
