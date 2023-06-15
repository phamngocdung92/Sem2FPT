import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../sevice/products.sevice';
import { AdminMentorComponent } from '../admin-mentor/admin-mentor.component';
import { Menu } from 'src/app/model/menu';
import { Menu2 } from 'src/app/model/menu2';
import { Gender } from 'src/app/model/gender';
import { Category } from 'src/app/model/category';
import { Season } from 'src/app/model/season';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  product: any = {};
  menus: Menu[] = [];
  menus2: Menu2[] = [];
  genders: Gender[] = [];
  categories: Category[] = [];
  seasons: Season[] = [];
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDetailProduct()
  }
  getDetailProduct(){
    this.route.params.subscribe(data => {
      this.productService.getDetailProduct(data['id']).subscribe(data => {
        this.product = data.result;
      });
    });
    console.log(this.product);
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
  };
  
  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  updateProduct(): void {
    if (this.selectedImage) {
      // Create FormData object and append the selected image
      const formData = new FormData();
      formData.append('image', this.selectedImage, this.selectedImage.name);

      // Append other product data
      formData.append('name_product', this.product.name_product);
      // Append other form fields

      this.productService.updateProduct(this.product.id_product, formData).subscribe(data => {
        this.router.navigateByUrl('/admin/mentor');
      });
    }
  }
}