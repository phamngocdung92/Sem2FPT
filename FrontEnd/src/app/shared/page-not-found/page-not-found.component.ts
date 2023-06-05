import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from '../../sevice/products.sevice';
import { HttpClient } from '@angular/common/http';
import { Input,ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/products';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  private toggleButton: any;
    private sidebarVisible: boolean;
    viewer:any;

  form = new FormGroup({
    searchKey: new FormControl()
})

constructor(public location: Location, private element : ElementRef, private router : Router) {
    this.sidebarVisible = false;
}
  ngOnInit(): void {
  }
  handleSearch() {
    this.router.navigateByUrl('/search?q=' + this.form.value.searchKey);
}

}

