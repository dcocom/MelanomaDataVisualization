import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.styl']
})
export class PlaceholderComponent implements OnInit {
  public screenHeight: number;

  constructor() {
    this.screenHeight = window.innerHeight + 10;
  }

  ngOnInit() {
  }

}
