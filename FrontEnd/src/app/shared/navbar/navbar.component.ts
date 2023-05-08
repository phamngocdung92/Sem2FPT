import { Component, OnInit, TemplateRef, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    viewer:any;
    active = 1;
    form = new FormGroup({
        searchKey: new FormControl()
    })

    constructor(public location: Location, private element : ElementRef, private router : Router, private offcanvasService: NgbOffcanvas,private fb: FormBuilder,) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        let viewer  = Number(localStorage.getItem('viewer'));

        if(viewer){
          viewer ++;
          localStorage.setItem('viewer', viewer .toString())
        }else {
          localStorage.setItem('viewer', '1')
        }
        console.log('viewer', viewer )
      this.viewer = localStorage.getItem('viewer');

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    handleSearch() {
        this.router.navigateByUrl('/search?q=' + this.form.value.searchKey);
    }
    openEnd(content: TemplateRef<any>) {
      this.offcanvasService.open(content, { position: 'end' });
    }
    openTop(contentt: TemplateRef<any>) {
      this.offcanvasService.open(contentt, { position: 'top' });
    }
    url = 'http://localhost:4200';
  admin = this.fb.group({
    "email": ["", [Validators.email,Validators.pattern("olawithbae217@gmail.com"), Validators.required]],

    "password": ["",[Validators.required, Validators.pattern("1234567")]]
  })
  // @ts-ignore
  focus: boolean;
  // @ts-ignore
  focus1: boolean;

  get form1() {
    return this.admin.controls
  }
  onSubmit() {

    // tslint:disable-next-line:triple-equals
    if ( true) {
      alert('Welcome Admin Come Back');

      this.router.navigate([''])
    }

  }
}



