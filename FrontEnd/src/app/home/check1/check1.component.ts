import { Component,TemplateRef } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule,NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-check1',
  templateUrl: './check1.component.html',
  styleUrls: ['./check1.component.css'],

  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})

export class Check1Component {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(private offcanvasService: NgbOffcanvas) {}

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}



}
