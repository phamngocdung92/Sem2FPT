import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'

import { Product , } from 'src/app/model/products';
import { user } from 'src/app/model/user';
import { ProductService } from 'src/app/sevice/products.sevice';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminGuard } from 'src/app/modules/admin.guard';
import { Menu } from 'src/app/model/menu';
import { ProductWithDetails } from 'src/app/model/productwithdetail';
import { Gender } from 'src/app/model/gender';
import { Category } from 'src/app/model/category';
import { Season } from 'src/app/model/season';
import { Menu2 } from 'src/app/model/menu2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-meo',
  templateUrl: './meo.component.html',
  styleUrls: ['./meo.component.css']
})
export class MeoComponent implements OnInit {
  url='http://localhost:3006/product/add';
  menuUrl = 'http://localhost:3006/menu/add';
  menu2Url = 'http://localhost:3006/menu2/add';

  menuu:Menu = {};
  menn2:Menu2 = {};

  nname = 'Angular';
  
  productForm: FormGroup;
   
  constructor(private fb:FormBuilder ,private formBuilder: FormBuilder,private productService: ProductService,private httpClient: HttpClient,private router: Router,private modalService: NgbModal) {
    this.menuu= new Menu();
   
    this.productForm = this.fb.group({
      id_menu: '',
      image_b: '',
      name_menu: '',
      router_link_menu: '',
      title_b: '',
      check_column: '',
      quantities: this.fb.array([]) ,
    });
  }
  
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      id_menu2: '',
      image_b2: '',
      id_menu: '',
      name_menu2: '',
      router_link_menu2: '',
      title_b2: '',
      ViOrIma:'',
      Name:'',
      ten:'',
      chek:'',


      
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
   
  onSubmit() {
    console.log(this.productForm.value);
    
  }
  save2() {
    this.menuu.id_menu = this.productForm.value.id_menu;
    this.menuu.image_b = this.productForm.value.image_b;
    this.menuu.name_menu = this.productForm.value.name_menu;
    this.menuu.router_link_menu = this.productForm.value.router_link_menu;
    this.menuu.title_b = this.productForm.value.title_b;
    this.menuu.check_column = this.productForm.value.check_column;
    this.httpClient.post(this.menuUrl, this.menuu).subscribe(data => {
      console.log(data);
    const quantities = this.productForm.value.quantities;
    for (let i = 0; i < quantities.length; i++) {
      const menn2: Menu2 = {
        id_menu2: quantities[i].id_menu2,
        image_b2: quantities[i].image_b2,
        name_menu2: quantities[i].name_menu2,
        router_link_menu2: quantities[i].router_link_menu2,
        title_b2: quantities[i].title_b,
        id_menu: this.menuu.id_menu,
        ViOrIma:quantities[i].ViOrIma,
        Name:quantities[i].Name,
        ten:quantities[i].ten,
        chek:quantities[i].chek,

      };
  
      this.httpClient.post(this.menu2Url, menn2).subscribe(data => {
        console.log(data);
        // Thực hiện các xử lý khác sau khi lưu thành công
      });
    }
    window.alert('Thêm Menu thành công !');
    window.location.reload();
    
  });

  }

  ngOnInit(): void {}

 
  

}
