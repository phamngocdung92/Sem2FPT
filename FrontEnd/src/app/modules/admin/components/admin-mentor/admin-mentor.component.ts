import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../sevice/auth.service";
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
@Component({
  selector: 'app-admin-mentor',
  templateUrl: './admin-mentor.component.html',
  styleUrls: ['./admin-mentor.component.css']
})
export class AdminMentorComponent implements OnInit {
  public isCollapsed = false;
  url='http://localhost:3006/product/add';
  menuUrl = 'http://localhost:3006/menu/add';
  product:Product ={};
  menuu:Menu = {};
	active = 1;
  id: any;
  isAdmin: string | null;
  isShow: boolean = true;
  showAdmin: boolean = false;
  products: any[] = []; // Mảng chứa danh sách sản phẩm
 // Users: any{};
 users: user[] = [];
 menus: Menu[]=[];
 menus2: Menu2[]=[];
 genders: Gender[]=[];
 categories: Category[]=[];
 seasons: Season[]=[];
 productsWithDetails: ProductWithDetails[] = [];


  uploadImage: any;
  constructor(private productService: ProductService, private auth: AuthService,private httpClient: HttpClient,private router: Router) {
    this.product = new Product();
    this.menuu = new Menu();
    const token = localStorage.getItem('');


    if(token){
      this.isShow = false;
    }
    this.isAdmin = localStorage.getItem('isadmin') ?? null;
  }

  ngOnInit(): void {
   
    this.productService.getgender().subscribe(
      (data: any) => {
        this.genders = data.result;
        console.log(this.genders)
      },
      (error) => {
        console.error('Lỗi:', error);
      }

    );
    this.productService.getSeason().subscribe(
      (data: any) => {
        this.seasons = data.result;
        console.log(this.seasons)
      },
      (error) => {
        console.error('Lỗi:', error);
      }

    );

    this.productService.getCategory().subscribe(
      (data: any) => {
        this.categories = data.result;
        console.log(this.categories)
      },
      (error) => {
        console.error('Lỗi:', error);
      }

    );
    this.productService.getAllAcc().subscribe(
      (data: any) => {
        this.users = data.user;
        console.log(this.users);
        localStorage.setItem('isadmin', data.isAdmin);
        console.log();
         const isAdmin: string = localStorage.getItem('isadmin') ?? '';
         this.isAdmin = isAdmin;

         if (isAdmin === '1') {
        this.showAdmin = true;

    }
      },
      (error) => {
        console.error('Lỗi:', error);
      }

    );
    this.productService.getMenu().subscribe(
      (data: any) => {

          this.menus = data.result;
          console.log(this.menus);

      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
    this.productService.getMenu2().subscribe(
      (data: any) => {

          this.menus2 = data.result;
          console.log(this.menus2);

      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data.result;
        console.log(this.products);
    
        this.productsWithDetails = this.products.map((product: Product) => {
          const productWithDetails: ProductWithDetails = { ...product };
          const gender = this.genders.find((gender: Gender) => gender.id_gender === product.id_gender);
          const category = this.categories.find((category: Category) => category.id_category === product.id_category);
          const season = this.seasons.find((season: Season) => season.id_season ===  product.id_season);
          const menu = this.menus.find((menu: Menu) => menu.id_menu === product.id_menu);
          const menu2 = this.menus2.find((menu2: Menu2) => menu2.id_menu2 === product.id_menu2);
          productWithDetails.gender = gender?.gender;
          productWithDetails.category = category?.name_category;
          productWithDetails.season = season?.name_season;
          productWithDetails.menu = menu?.name_menu;
          productWithDetails.menu2 = menu2?.name_menu2;
          
          return productWithDetails;
        });
    
        console.log(this.productsWithDetails);
      },
      (error) => {
        console.error('Lỗi:', error);
      }
    );


  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  onDeleteProduct(id: number): void {
    const confirmation = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (confirmation) {
      this.productService.DeleteProduct(id).subscribe(
        () => {
          window.location.reload();
          console.log('Xóa dữ liệu thành công');
          // Thực hiện các hành động khác sau khi xóa dữ liệu thành công
        },
        (error) => {
          console.error('Lỗi xóa dữ liệu:', error);
        }
      );
    } else {
      console.log('Hủy xóa dữ liệu');
      // Thực hiện các hành động khác khi hủy xóa dữ liệu
    }
  }
  onDeleteAcc(id: number): void {
    const confirmation = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (confirmation) {
      this.productService.DeleteAcc(id).subscribe(
        () => {
          window.location.reload();
          console.log('Xóa dữ liệu thành công');
          // Thực hiện các hành động khác sau khi xóa dữ liệu thành công
        },
        (error) => {
          console.error('Lỗi xóa dữ liệu:', error);
        }
      );
    } else {
      console.log('Hủy xóa dữ liệu');
      // Thực hiện các hành động khác khi hủy xóa dữ liệu
    }
  }
  onDeleteMenu(id: string): void {
    const confirmation = window.confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (confirmation) {
      this.productService.DeleteMenu(id).subscribe(
        () => {
          window.location.reload();
          console.log('Xóa dữ liệu thành công');
          // Thực hiện các hành động khác sau khi xóa dữ liệu thành công
        },
        (error) => {
          console.error('Lỗi xóa dữ liệu:', error);
        }
      );
    } else {
      console.log('Hủy xóa dữ liệu');
      // Thực hiện các hành động khác khi hủy xóa dữ liệu
    }
  }

  save2() {
    this.httpClient.post(this.menuUrl, this.menuu).subscribe(data => {
      console.log(data);
       window.location.reload();
      // Thực hiện các xử lý khác sau khi lưu thành công
    });
  }
  save1() {
    this.httpClient.post(this.url, this.product).subscribe(data => {
      console.log(data);
       window.location.reload();
      // Thực hiện các xử lý khác sau khi lưu thành công
    });
  }
  // save1(){
  //   this.httpClient.post(this.url, this.product).subscribe(data=>{
  //     window.location.reload();
  //       console.log(data);
  //   })
  // }

  logout():void{
    this.auth.logout();
  }

}
