import { Component } from '@angular/core';

@Component({
  selector: 'app-check3',
  templateUrl: './check3.component.html',
  styleUrls: ['./check3.component.css']
})
export class Check3Component {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
