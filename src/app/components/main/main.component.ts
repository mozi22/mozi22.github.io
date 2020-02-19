import { Component, OnInit } from '@angular/core';
import { DataModel } from "../../models/data";
import  data  from  '../../data.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public dataModel: DataModel[];

  constructor() { }

  ngOnInit() {
    this.dataModel = data;
  }

}
