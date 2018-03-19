import {Component, OnInit, Input} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {
  @Input() public currentElement;
  public categories: Array<any> = [
    {
      name: 'Why is important?',
      id: 'important'
    },
    {
      name: 'How to detect it?',
      id: 'detection'
    },
    {
      name: 'Sex',
      id: 'sex'
    },
    {
      name: 'Survival time ratio',
      id: 'survival-time'
    },
    {
      name: 'Age',
      id: 'age'
    },
    {
      name: 'Status',
      id: 'status'
    },
    {
      name: 'Relations',
      id: 'relations'
    },
    {
      name: 'Sex vs Status',
      id: 'sex-status'
    }

  ];

  constructor() {

  }

  ngOnInit() {

  }

  goToLink(link) {
    console.log(link);
    this.currentElement = link;
  }

}
