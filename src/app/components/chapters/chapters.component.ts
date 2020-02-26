import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-chapters",
  templateUrl: "./chapters.component.html",
  styleUrls: ["./chapters.component.css"]
})
export class ChaptersComponent implements OnInit {
  constructor() {}

  @ViewChild("first") first: ElementRef;
  @ViewChild("second") second: ElementRef;
  ngOnInit() {
    $(this.second.nativeElement).hide();
  }

  animateLeft($src, $tgt) {
    var $parent = $src.parent();
    var width = $parent.width();
    var srcWidth = $src.width();

    $src.css({ position: "absolute" });
    $tgt
      .hide()
      .appendTo($parent)
      .css({ left: width, position: "absolute" });

    $src.animate({ left: -width }, 500, function() {
      $src.hide();
      $src.css({ left: null, position: null });
    });
    $tgt.show().animate({ left: 0 }, 500, function() {
      $tgt.css({ left: null, position: null });
    });
  }

  nextButtonClick() {
    let $first = $(this.first.nativeElement);
    let $second = $(this.second.nativeElement);

    this.animateLeft($first, $second);
    var tmp = $first;
    $first = $second;
    $second = tmp;
  }
}
