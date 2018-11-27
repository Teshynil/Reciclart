import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.css']
})
export class SideMenuItemComponent implements OnInit {
  @Input() ruta:string;
  @Input() icon:string;
  @Input() elemento:string;
  constructor() { }

  ngOnInit() {
  }

}
