import { Component, OnInit, Input } from '@angular/core';
import { DataModel } from 'src/app/models/data';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() bookObj: DataModel;

  constructor() { }

  ngOnInit() {
  }

}
