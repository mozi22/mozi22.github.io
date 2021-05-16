import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
})
export class SourceComponent implements OnInit {
  @Input() source: string = '';
  @Input() comments: string[] = [];
  constructor() {}

  ngOnInit(): void {}
}
